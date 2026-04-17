import { Hono } from "hono";
import healthDocs from "./health-docs.routes";
import militaryRankRoutes from "./military-rank.routes";
import militaryRoutes from "./military.routes";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";

const routes = new Hono();

routes.route("/", healthDocs);
routes.route("/", authRoutes);
routes.route("/military", militaryRoutes);
routes.route("/military-rank", militaryRankRoutes);
routes.route("/user", userRoutes);

routes.notFound((c) => {
  return c.json({ error: "Not Found" }, 404);
});

export default routes;
