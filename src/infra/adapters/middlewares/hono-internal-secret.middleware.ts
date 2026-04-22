import type { Context, Next } from "hono";

export const createHonoInternalSecretMiddleware = (expectedSecret: string) => {
  return async (c: Context, next: Next) => {
    const secret = c.req.header("X-Internal-Secret");

    if (!secret) {
      // Sem header — deixa CORS decidir (pode ser request de browser)
      await next();
      return c.res;
    }

    if (!expectedSecret || secret !== expectedSecret) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Secret válido: sinaliza para o CORS fazer bypass de origin
    c.set("bypassCors", true);
    await next();
    return c.res;
  };
};
