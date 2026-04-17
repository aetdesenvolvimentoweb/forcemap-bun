import type { Context, Next } from "hono";

import { LoggerProtocol } from "../../../application/protocols";

/**
 * Interface para gerenciamento de seed
 */
export interface SeedManagerProtocol {
  ensureSeeded(): Promise<void>;
  getStatus(): { isSeeded: boolean; isSeeding: boolean };
}

/**
 * Middleware de seed para Hono.
 * Recebe dependências por parâmetro e retorna função Hono.
 *
 * ✅ Não importa de Main
 * ✅ Não conhece SeedManager concreto
 * ✅ Adapter puro - apenas adaptação técnica
 */
export const createHonoSeedMiddleware = (
  seedManager: SeedManagerProtocol,
  logger: LoggerProtocol,
) => {
  return async (c: Context, next: Next) => {
    try {
      const status = seedManager.getStatus();

      // Se já foi seeded, continue
      if (status.isSeeded) {
        await next();
        return c.res;
      }

      // Se está em processo de seeding, aguarde
      await seedManager.ensureSeeded();

      await next();
      return c.res;
    } catch (error) {
      logger.error("Seed middleware error", {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      });
      return c.json(
        {
          error:
            "Service temporarily unavailable. Database initialization failed.",
        },
        503,
      );
    }
  };
};
