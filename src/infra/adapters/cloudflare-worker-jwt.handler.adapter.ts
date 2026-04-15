import { sign, verify } from "@tsndr/cloudflare-worker-jwt";

import { InvalidParamError, UnauthorizedError } from "../../application/errors";
import { TokenHandlerProtocol } from "../../application/protocols";
import { Payload, RefreshTokenPayload } from "../../domain/entities";
import { ConfigurationError } from "../errors";

interface CloudflareWorkerJwtHandlerAdapterConfig {
  accessTokenSecret: string;
  refreshTokenSecret: string;
  accessTokenExpiry?: string;
  refreshTokenExpiry?: string;
}

export class CloudflareWorkerJwtHandlerAdapter implements TokenHandlerProtocol {
  private readonly accessTokenSecret: string;
  private readonly refreshTokenSecret: string;
  private readonly accessTokenExpiry: number;
  private readonly refreshTokenExpiry: number;

  constructor(config: CloudflareWorkerJwtHandlerAdapterConfig) {
    const {
      accessTokenSecret,
      refreshTokenSecret,
      accessTokenExpiry,
      refreshTokenExpiry,
    } = config;

    // Validação obrigatória de secrets
    if (!accessTokenSecret || !refreshTokenSecret) {
      throw new ConfigurationError(
        "JWT_ACCESS_SECRET e JWT_REFRESH_SECRET devem ser configurados",
      );
    }

    // Validação de tamanho mínimo em produção
    const nodeEnv = (globalThis as any).process?.env?.NODE_ENV || "development";
    if (nodeEnv === "production") {
      if (accessTokenSecret.length < 32) {
        throw new ConfigurationError(
          "JWT_ACCESS_SECRET deve ter no mínimo 32 caracteres em produção",
        );
      }

      if (refreshTokenSecret.length < 32) {
        throw new ConfigurationError(
          "JWT_REFRESH_SECRET deve ter no mínimo 32 caracteres em produção",
        );
      }
    }

    this.accessTokenSecret = accessTokenSecret;
    this.refreshTokenSecret = refreshTokenSecret;
    this.accessTokenExpiry = this.parseExpiry(accessTokenExpiry || "15m");
    this.refreshTokenExpiry = this.parseExpiry(refreshTokenExpiry || "7d");
  }

  private parseExpiry(expiry: string): number {
    const match = expiry.match(/^(\d+)([smhd])$/);
    if (!match) {
      throw new ConfigurationError(`Formato de expiração inválido: ${expiry}`);
    }
    const value = parseInt(match[1], 10);
    const unit = match[2];
    switch (unit) {
      case "s":
        return value;
      case "m":
        return value * 60;
      case "h":
        return value * 3600;
      case "d":
        return value * 86400;
      default:
        throw new ConfigurationError(`Unidade de expiração inválida: ${unit}`);
    }
  }

  public readonly generateAccessToken = async (
    payload: Omit<Payload, "iat" | "exp">,
  ): Promise<string> => {
    try {
      const now = Math.floor(Date.now() / 1000);
      const payloadWithExp = {
        ...payload,
        iat: now,
        exp: now + this.accessTokenExpiry,
        iss: "forcemap-api",
        aud: "forcemap-client",
      };
      return await sign(payloadWithExp, this.accessTokenSecret);
    } catch {
      throw new InvalidParamError("Payload do token", "inválido para geração");
    }
  };

  public readonly generateRefreshToken = async (
    payload: Omit<RefreshTokenPayload, "iat" | "exp">,
  ): Promise<string> => {
    try {
      const now = Math.floor(Date.now() / 1000);
      const payloadWithExp = {
        ...payload,
        iat: now,
        exp: now + this.refreshTokenExpiry,
        iss: "forcemap-api",
        aud: "forcemap-client",
      };
      return await sign(payloadWithExp, this.refreshTokenSecret);
    } catch {
      throw new InvalidParamError(
        "Payload do refresh token",
        "inválido para geração",
      );
    }
  };

  public readonly verifyAccessToken = async (
    token: string,
  ): Promise<Payload> => {
    try {
      if (!token || typeof token !== "string") {
        throw new UnauthorizedError("Token de acesso obrigatório");
      }

      const isValid = await verify(token, this.accessTokenSecret);

      if (!isValid) {
        throw new UnauthorizedError("Token de acesso inválido");
      }

      const decoded = JSON.parse(atob(token.split(".")[1])) as Payload;

      if (
        !decoded.userId ||
        !decoded.sessionId ||
        !decoded.role ||
        !decoded.militaryId ||
        decoded.iss !== "forcemap-api" ||
        decoded.aud !== "forcemap-client"
      ) {
        throw new UnauthorizedError("Token de acesso inválido");
      }

      return decoded;
    } catch (error) {
      if (error instanceof Error && error.message.includes("expired")) {
        throw new UnauthorizedError("Token de acesso expirado");
      }

      if (error instanceof UnauthorizedError) {
        throw error;
      }

      throw new UnauthorizedError("Erro na validação do token de acesso");
    }
  };

  public readonly verifyRefreshToken = async (
    token: string,
  ): Promise<RefreshTokenPayload> => {
    try {
      if (!token || typeof token !== "string") {
        throw new UnauthorizedError("Refresh token obrigatório");
      }

      const isValid = await verify(token, this.refreshTokenSecret);

      if (!isValid) {
        throw new UnauthorizedError("Refresh token inválido");
      }

      const decoded = JSON.parse(
        atob(token.split(".")[1]),
      ) as RefreshTokenPayload;

      if (
        !decoded.userId ||
        !decoded.sessionId ||
        decoded.iss !== "forcemap-api" ||
        decoded.aud !== "forcemap-client"
      ) {
        throw new UnauthorizedError("Refresh token inválido");
      }

      return decoded;
    } catch (error) {
      if (error instanceof Error && error.message.includes("expired")) {
        throw new UnauthorizedError("Refresh token expirado");
      }

      if (error instanceof UnauthorizedError) {
        throw error;
      }

      throw new UnauthorizedError("Erro na validação do refresh token");
    }
  };

  public readonly extractTokenFromHeader = (
    authHeader?: string,
  ): string | null => {
    if (!authHeader || typeof authHeader !== "string") {
      return null;
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return null;
    }

    const token = parts[1];

    if (!token || token.trim().length === 0) {
      return null;
    }

    return token.trim();
  };
}
