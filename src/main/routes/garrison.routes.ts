import { Hono } from "hono";

import { honoRouteAdapter } from "../../infra/adapters";
import {
  makeCreateGarrisonController,
  makeDeleteGarrisonController,
  makeFindByIdGarrisonController,
  makeListAllGarrisonController,
  makeUpdateGarrisonController,
} from "../factories/controllers";
import { makeGlobalLogger } from "../factories/logger";
import { makeHonoAuthMiddleware } from "../factories/middlewares";

const garrisonRoutes = new Hono();
const { requireAuthWithRoles } = makeHonoAuthMiddleware();
const logger = makeGlobalLogger();

// Operações de consulta - ADMIN e CHEFE
garrisonRoutes.post(
  "/",
  requireAuthWithRoles(["Admin", "Chefe", "ACA"]),
  honoRouteAdapter(makeCreateGarrisonController(), logger),
);

garrisonRoutes.delete(
  "/:id",
  requireAuthWithRoles(["Admin", "Chefe", "ACA"]),
  honoRouteAdapter(makeDeleteGarrisonController(), logger),
);

garrisonRoutes.put(
  "/:id",
  requireAuthWithRoles(["Admin", "Chefe", "ACA"]),
  honoRouteAdapter(makeUpdateGarrisonController(), logger),
);

garrisonRoutes.get(
  "/",
  requireAuthWithRoles(["Admin", "Chefe", "ACA"]),
  honoRouteAdapter(makeListAllGarrisonController(), logger),
);

garrisonRoutes.get(
  "/:id",
  requireAuthWithRoles(["Admin", "Chefe", "ACA"]),
  honoRouteAdapter(makeFindByIdGarrisonController(), logger),
);

export default garrisonRoutes;
