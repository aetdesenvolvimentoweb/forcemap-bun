import { Payload, RefreshTokenPayload } from "../../domain/entities";

export interface TokenHandlerProtocol {
  generateAccessToken(payload: Omit<Payload, "iat" | "exp">): Promise<string>;
  generateRefreshToken(
    payload: Omit<RefreshTokenPayload, "iat" | "exp">,
  ): Promise<string>;
  verifyAccessToken(token: string): Promise<Payload>;
  verifyRefreshToken(token: string): Promise<RefreshTokenPayload>;
  extractTokenFromHeader(authHeader?: string): string | null;
}
