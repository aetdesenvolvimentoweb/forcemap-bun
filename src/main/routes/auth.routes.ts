import { Hono } from "hono";

import { honoRouteAdapter } from "../../infra/adapters";

import { makeGlobalLogger } from "../factories/logger";
import {
  makeHonoAuthMiddleware,
  makeHonoSeedMiddleware,
} from "../factories/middlewares";
import {
  makeLoginController,
  makeLogoutController,
  makeRefreshTokenController,
} from "../factories/controllers";

const authRoutes = new Hono();

// Middlewares compostos via factories (Main)
const { requireAuth } = makeHonoAuthMiddleware();
const ensureSeedMiddleware = makeHonoSeedMiddleware();
const logger = makeGlobalLogger();

/**
 * Rotas de autenticação
 * Prefixo: /api/v1
 */

// POST /api/v1/login - Autenticação de usuário
authRoutes.post(
  "/login",
  ensureSeedMiddleware,
  honoRouteAdapter(makeLoginController(), logger),
);

// POST /api/v1/refresh-token - Renovação de token de acesso
authRoutes.post(
  "/refresh-token",
  honoRouteAdapter(makeRefreshTokenController(), logger),
);

// POST /api/v1/logout - Encerramento de sessão (protegido)
authRoutes.post(
  "/logout",
  requireAuth,
  honoRouteAdapter(makeLogoutController(), logger),
);

export default authRoutes;
