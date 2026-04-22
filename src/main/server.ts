import { Hono } from "hono";

import { securityHeadersDev, securityHeadersProd } from "../infra/adapters";
import {
  makeHonoCorsMiddleware,
  makeHonoInternalSecretMiddleware,
  makeHonoSecurityLoggingMiddleware,
  makeHonoSeedMiddleware,
} from "./factories/middlewares";
import routes from "./routes";

const app = new Hono();

// Middlewares compostos via factories (Main)
const securityLoggingMiddleware = makeHonoSecurityLoggingMiddleware();
const seedMiddleware = makeHonoSeedMiddleware();

// Middleware de seed - inicializa banco de dados se necessário
app.use("*", seedMiddleware);

// Middleware de CORS - deve vir antes de outros middlewares
app.use("*", async (c, next) => {
  const env = (c.env as Record<string, string | undefined>) ?? {};
  const { corsAuto } = makeHonoCorsMiddleware(env);
  return corsAuto()(c, next);
});

// Middleware de segredo interno - rejeita requests sem X-Internal-Secret válido
app.use("*", async (c, next) => {
  const env = (c.env as Record<string, string | undefined>) ?? {};
  return makeHonoInternalSecretMiddleware(env)(c, next);
});

// Middleware de segurança - aplica headers de segurança
app.use("*", async (c, next) => {
  const env = (c.env as Record<string, string | undefined>) ?? {};
  const isDevelopment = env.BUN_ENV === "development";
  return isDevelopment
    ? securityHeadersDev()(c, next)
    : securityHeadersProd()(c, next);
});

// Middleware de logging de segurança - monitora eventos
app.use("*", securityLoggingMiddleware);

app.route("/", routes);

export default app;
