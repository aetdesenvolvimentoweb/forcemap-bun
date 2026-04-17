import { Hono } from "hono";

import { honoRouteAdapter } from "../../infra/adapters";
import {
  makeCreateUserController,
  makeDeleteUserController,
  makeFindByIdUserController,
  makeListAllUserController,
  makeUpdateUserPasswordController,
  makeUpdateUserRoleController,
} from "../factories/controllers";
import { makeGlobalLogger } from "../factories/logger";
import { makeHonoAuthMiddleware } from "../factories/middlewares";

const userRoutes = new Hono();
const { requireAuth, requireAuthWithRoles } = makeHonoAuthMiddleware();
const logger = makeGlobalLogger();

// Todas as rotas de usuário requerem autenticação mínima
// Rotas que requerem permissão ADMIN ou CHEFE
userRoutes.post(
  "/",
  requireAuthWithRoles(["Admin", "Chefe"]),
  honoRouteAdapter(makeCreateUserController(), logger),
);

userRoutes.delete(
  "/:id",
  requireAuthWithRoles(["Admin", "Chefe"]),
  honoRouteAdapter(makeDeleteUserController(), logger),
);

userRoutes.patch(
  "/update-role/:id",
  requireAuthWithRoles(["Admin", "Chefe"]),
  honoRouteAdapter(makeUpdateUserRoleController(), logger),
);

userRoutes.get(
  "/",
  requireAuthWithRoles(["Admin", "Chefe"]),
  honoRouteAdapter(makeListAllUserController(), logger),
);

userRoutes.get(
  "/:id",
  requireAuthWithRoles(["Admin", "Chefe"]),
  honoRouteAdapter(makeFindByIdUserController(), logger),
);

// Apenas o próprio usuário pode alterar sua senha (LGPD)
userRoutes.patch(
  "/update-password/:id",
  requireAuth,
  honoRouteAdapter(makeUpdateUserPasswordController(), logger),
);

export default userRoutes;
