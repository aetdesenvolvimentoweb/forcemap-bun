import { Hono } from "hono";

import { honoRouteAdapter } from "../../infra/adapters";
import {
  makeCreateOfficerController,
  makeDeleteOfficerController,
  makeFindByIdOfficerController,
  makeListAllOfficerController,
  makeUpdateOfficerController,
} from "../factories/controllers";
import { makeGlobalLogger } from "../factories/logger";
import { makeHonoAuthMiddleware } from "../factories/middlewares";

const officerRoutes = new Hono();
const { requireAuthWithRoles } = makeHonoAuthMiddleware();
const logger = makeGlobalLogger();

// Operações de consulta - ADMIN e CHEFE
officerRoutes.post(
  "/",
  requireAuthWithRoles(["Admin", "Chefe", "ACA"]),
  honoRouteAdapter(makeCreateOfficerController(), logger),
);

officerRoutes.delete(
  "/:id",
  requireAuthWithRoles(["Admin", "Chefe"]),
  honoRouteAdapter(makeDeleteOfficerController(), logger),
);

officerRoutes.put(
  "/:id",
  requireAuthWithRoles(["Admin", "Chefe", "ACA"]),
  honoRouteAdapter(makeUpdateOfficerController(), logger),
);

officerRoutes.get(
  "/",
  requireAuthWithRoles(["Admin", "Chefe", "ACA"]),
  honoRouteAdapter(makeListAllOfficerController(), logger),
);

officerRoutes.get(
  "/:id",
  requireAuthWithRoles(["Admin", "Chefe", "ACA"]),
  honoRouteAdapter(makeFindByIdOfficerController(), logger),
);

export default officerRoutes;
