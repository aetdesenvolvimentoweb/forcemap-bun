import { Hono } from "hono";
import { honoRouteAdapter } from "../../infra/adapters";
import {
  makeCreateMilitaryRankController,
  makeDeleteMilitaryRankController,
  makeFindByIdMilitaryRankController,
  makeListAllMilitaryRankController,
  makeUpdateMilitaryRankController,
} from "../factories/controllers";
import { makeGlobalLogger } from "../factories/logger";
import { makeHonoAuthMiddleware } from "../factories/middlewares";

const militaryRankRoutes = new Hono();
const { requireAuthWithRoles } = makeHonoAuthMiddleware();
const logger = makeGlobalLogger();

// Operações críticas - apenas ADMIN
militaryRankRoutes.post(
  "/",
  requireAuthWithRoles(["Admin"]),
  honoRouteAdapter(makeCreateMilitaryRankController(), logger),
);
militaryRankRoutes.get(
  "/",
  requireAuthWithRoles(["Admin"]),
  honoRouteAdapter(makeListAllMilitaryRankController(), logger),
);
militaryRankRoutes.get(
  "/:id",
  requireAuthWithRoles(["Admin"]),
  honoRouteAdapter(makeFindByIdMilitaryRankController(), logger),
);
militaryRankRoutes.delete(
  "/:id",
  requireAuthWithRoles(["Admin"]),
  honoRouteAdapter(makeDeleteMilitaryRankController(), logger),
);
militaryRankRoutes.put(
  "/:id",
  requireAuthWithRoles(["Admin"]),
  honoRouteAdapter(makeUpdateMilitaryRankController(), logger),
);

export default militaryRankRoutes;
