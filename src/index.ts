import { logger } from "hono/logger";
import { makeGlobalLogger } from "./main/factories/logger";
import routes from "./main/routes";
import app from "./main/server";

const appLogger = makeGlobalLogger();

app.route("/api/v1", routes);
app.use(logger());

appLogger.info("Aplicação iniciada");

export default app;
