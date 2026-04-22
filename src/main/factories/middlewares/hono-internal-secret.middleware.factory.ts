import { createHonoInternalSecretMiddleware } from "../../../infra/adapters/middlewares/hono-internal-secret.middleware";

export const makeHonoInternalSecretMiddleware = (
  env: Record<string, string | undefined> = {},
) => {
  const expectedSecret = env.API_SECRET ?? "";
  return createHonoInternalSecretMiddleware(expectedSecret);
};
