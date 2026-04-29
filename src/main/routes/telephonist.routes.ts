import { Hono } from "hono";

import { honoRouteAdapter } from "../../infra/adapters";
import {
  makeCreateTelephonistController,
  makeDeleteTelephonistController,
  makeFindByIdTelephonistController,
  makeListAllTelephonistController,
  makeUpdateTelephonistController,
} from "../factories/controllers";
import { makeGlobalLogger } from "../factories/logger";
import { makeHonoAuthMiddleware } from "../factories/middlewares";

const telephonistRoutes = new Hono();
const { requireAuthWithRoles } = makeHonoAuthMiddleware();
const logger = makeGlobalLogger();

// Operações de consulta - ADMIN e CHEFE
telephonistRoutes.post(
  "/",
  requireAuthWithRoles(["Admin", "Chefe", "ACA"]),
  honoRouteAdapter(makeCreateTelephonistController(), logger),
);

telephonistRoutes.delete(
  "/:id",
  requireAuthWithRoles(["Admin", "Chefe", "ACA"]),
  honoRouteAdapter(makeDeleteTelephonistController(), logger),
);

telephonistRoutes.put(
  "/:id",
  requireAuthWithRoles(["Admin", "Chefe", "ACA"]),
  honoRouteAdapter(makeUpdateTelephonistController(), logger),
);

telephonistRoutes.get(
  "/",
  requireAuthWithRoles(["Admin", "Chefe", "ACA"]),
  honoRouteAdapter(makeListAllTelephonistController(), logger),
);

telephonistRoutes.get(
  "/:id",
  requireAuthWithRoles(["Admin", "Chefe", "ACA"]),
  honoRouteAdapter(makeFindByIdTelephonistController(), logger),
);

export default telephonistRoutes;
