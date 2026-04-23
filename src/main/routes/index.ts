import { Hono } from "hono";
import authRoutes from "./auth.routes";
import healthDocs from "./health-docs.routes";
import militaryRankRoutes from "./military-rank.routes";
import militaryRoutes from "./military.routes";
import userRoutes from "./user.routes";
import vehicleRoutes from "./vehicle.routes";

const routes = new Hono();

routes.route("/", healthDocs);
routes.route("/api/v1", authRoutes);
routes.route("/api/v1/military", militaryRoutes);
routes.route("/api/v1/military-rank", militaryRankRoutes);
routes.route("/api/v1/vehicle", vehicleRoutes);
routes.route("/api/v1/user", userRoutes);

routes.notFound((c) => {
  return c.json({ error: "Not Found" }, 404);
});

export default routes;
