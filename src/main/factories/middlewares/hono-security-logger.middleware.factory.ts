import { securityLogging } from "../../../infra/adapters";
import { makeGlobalLogger } from "../logger";

/**
 * Factory para criar middleware de security logging do Hono.
 *
 * Responsabilidade de MAIN:
 * - Compõe logger com adapter de security logging (infra)
 */
export const makeHonoSecurityLoggingMiddleware = () => {
  const logger = makeGlobalLogger();
  return securityLogging(logger);
};
