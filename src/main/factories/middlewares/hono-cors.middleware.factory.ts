import { corsAuto, corsDev, corsProd } from "../../../infra/adapters";
import { makeGlobalLogger } from "../logger";

/**
 * Factory para criar middleware CORS do Hono.
 *
 * Responsabilidade de MAIN:
 * - Compõe logger com adapter CORS (infra)
 * - Fornece funções pré-configuradas
 */
export const makeHonoCorsMiddleware = (
  env: Record<string, string | undefined> = {},
) => {
  const logger = makeGlobalLogger();

  return {
    corsAuto: () => corsAuto(logger, env),
    corsDev: () => corsDev(logger, env),
    corsProd: () => corsProd(logger, env),
  };
};
