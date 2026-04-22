import type { Context, Next } from "hono";

export const createHonoInternalSecretMiddleware = (expectedSecret: string) => {
  return async (c: Context, next: Next) => {
    const secret = c.req.header("X-Internal-Secret");

    if (!expectedSecret || secret !== expectedSecret) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    await next();
    return c.res;
  };
};
