import { Hono } from "hono";

import { honoRouteAdapter } from "../../infra/adapters";
import {
  makeCreateACAController,
  makeDeleteACAController,
  makeFindByIdACAController,
  makeListAllACAController,
  makeUpdateACAController,
} from "../factories/controllers";
import { makeGlobalLogger } from "../factories/logger";
import { makeHonoAuthMiddleware } from "../factories/middlewares";

const acaRoutes = new Hono();
const { requireAuthWithRoles } = makeHonoAuthMiddleware();
const logger = makeGlobalLogger();

// Operações de consulta - ADMIN e CHEFE
acaRoutes.post(
  "/",
  requireAuthWithRoles(["Admin", "Chefe", "ACA"]),
  honoRouteAdapter(makeCreateACAController(), logger),
);

acaRoutes.delete(
  "/:id",
  requireAuthWithRoles(["Admin", "Chefe", "ACA"]),
  honoRouteAdapter(makeDeleteACAController(), logger),
);

acaRoutes.put(
  "/:id",
  requireAuthWithRoles(["Admin", "Chefe", "ACA"]),
  honoRouteAdapter(makeUpdateACAController(), logger),
);

acaRoutes.get(
  "/",
  requireAuthWithRoles(["Admin", "Chefe", "ACA"]),
  honoRouteAdapter(makeListAllACAController(), logger),
);

acaRoutes.get(
  "/:id",
  requireAuthWithRoles(["Admin", "Chefe", "ACA"]),
  honoRouteAdapter(makeFindByIdACAController(), logger),
);

export default acaRoutes;
