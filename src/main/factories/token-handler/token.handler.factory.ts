import { TokenHandlerProtocol } from "../../../application/protocols";
import { CloudflareWorkerJwtHandlerAdapter } from "../../../infra/adapters";

export const makeTokenHandler = (): TokenHandlerProtocol => {
  // Em desenvolvimento, usar valores padrão
  // Em produção, essas variáveis devem ser configuradas via wrangler secrets
  const accessSecret =
    (globalThis as any).JWT_ACCESS_SECRET ||
    "dev-access-secret-key-at-least-32-chars-long";
  const refreshSecret =
    (globalThis as any).JWT_REFRESH_SECRET ||
    "dev-refresh-secret-key-at-least-32-chars-long";
  const accessExpiry = (globalThis as any).JWT_ACCESS_EXPIRY || "15m";
  const refreshExpiry = (globalThis as any).JWT_REFRESH_EXPIRY || "7d";

  return new CloudflareWorkerJwtHandlerAdapter({
    accessTokenSecret: accessSecret,
    refreshTokenSecret: refreshSecret,
    accessTokenExpiry: accessExpiry,
    refreshTokenExpiry: refreshExpiry,
  });
};
