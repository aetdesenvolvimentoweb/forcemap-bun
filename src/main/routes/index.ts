import { Hono } from "hono";
import healthDocs from "./health-docs.routes";

const routes = new Hono();

routes.route("/", healthDocs);
routes.notFound((c) => {
  return c.json({ error: "Not Found" }, 404);
});

export default routes;
