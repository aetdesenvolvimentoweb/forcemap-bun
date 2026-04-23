import { Hono } from "hono";
import { honoRouteAdapter } from "../../infra/adapters";
import {
  makeCreateVehicleController,
  makeDeleteVehicleController,
  makeFindByIdVehicleController,
  makeListAllVehicleController,
  makeUpdateVehicleController,
} from "../factories/controllers";
import { makeGlobalLogger } from "../factories/logger";
import { makeHonoAuthMiddleware } from "../factories/middlewares";

const vehicleRoutes = new Hono();
const { requireAuthWithRoles } = makeHonoAuthMiddleware();
const logger = makeGlobalLogger();

// Operações críticas - apenas ADMIN
vehicleRoutes.post(
  "/",
  requireAuthWithRoles(["Admin"]),
  honoRouteAdapter(makeCreateVehicleController(), logger),
);
vehicleRoutes.get(
  "/",
  requireAuthWithRoles(["Admin"]),
  honoRouteAdapter(makeListAllVehicleController(), logger),
);
vehicleRoutes.get(
  "/:id",
  requireAuthWithRoles(["Admin"]),
  honoRouteAdapter(makeFindByIdVehicleController(), logger),
);
vehicleRoutes.delete(
  "/:id",
  requireAuthWithRoles(["Admin"]),
  honoRouteAdapter(makeDeleteVehicleController(), logger),
);
vehicleRoutes.put(
  "/:id",
  requireAuthWithRoles(["Admin"]),
  honoRouteAdapter(makeUpdateVehicleController(), logger),
);

export default vehicleRoutes;
