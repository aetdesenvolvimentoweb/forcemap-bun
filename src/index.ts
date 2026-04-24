import { logger } from "hono/logger";
import { makeGlobalLogger } from "./main/factories/logger";
import app from "./main/server";

const appLogger = makeGlobalLogger();

app.use(logger());

appLogger.info("Aplicação iniciada");

export default app;
