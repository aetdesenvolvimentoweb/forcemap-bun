import { Hono } from "hono";
import { logger } from "hono/logger";
import routes from "./main/routes";
import { makeGlobalLogger } from "./main/factories/logger";

const app = new Hono();
const appLogger = makeGlobalLogger();

app.use(logger());

appLogger.info("Aplicação iniciada");

app.route("/api/v1", routes);

export default app;
