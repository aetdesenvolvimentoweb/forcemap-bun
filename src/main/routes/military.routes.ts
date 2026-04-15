import { Hono } from "hono";

import { honoRouteAdapter } from "../../infra/adapters";
import {
  makeCreateMilitaryController,
  makeDeleteMilitaryController,
  makeFindByIdMilitaryController,
  makeListAllMilitaryController,
  makeUpdateMilitaryController,
} from "../factories/controllers";
import { makeGlobalLogger } from "../factories/logger";
import { makeHonoAuthMiddleware } from "../factories/middlewares";

const militaryRoutes = new Hono();
const { requireAuthWithRoles } = makeHonoAuthMiddleware();
const logger = makeGlobalLogger();

// Operações de consulta - ADMIN e CHEFE
militaryRoutes.post(
  "/",
  requireAuthWithRoles(["Admin", "Chefe", "ACA"]),
  honoRouteAdapter(makeCreateMilitaryController(), logger),
);

militaryRoutes.delete(
  "/:id",
  requireAuthWithRoles(["Admin", "Chefe"]),
  honoRouteAdapter(makeDeleteMilitaryController(), logger),
);

militaryRoutes.put(
  "/:id",
  requireAuthWithRoles(["Admin", "Chefe", "ACA"]),
  honoRouteAdapter(makeUpdateMilitaryController(), logger),
);

militaryRoutes.get(
  "/",
  requireAuthWithRoles(["Admin", "Chefe", "ACA"]),
  honoRouteAdapter(makeListAllMilitaryController(), logger),
);

militaryRoutes.get(
  "/:id",
  requireAuthWithRoles(["Admin", "Chefe", "ACA"]),
  honoRouteAdapter(makeFindByIdMilitaryController(), logger),
);

export default militaryRoutes;
