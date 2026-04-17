import { createHonoSeedMiddleware } from "../../../infra/adapters";
import { SeedManager } from "../../seed";
import { makeGlobalLogger } from "../logger";

/**
 * Factory para criar middleware de seed do Hono.
 *
 * Responsabilidade de MAIN:
 * - Compõe SeedManager com adapter Hono (infra)
 * - Não viola inversão de dependências
 */
export const makeHonoSeedMiddleware = () => {
  const logger = makeGlobalLogger();
  const seedManager = SeedManager.getInstance(logger);

  return createHonoSeedMiddleware(seedManager, logger);
};
