import { createHonoAuthMiddleware } from "../../../infra/adapters";
import { makeAuthMiddleware } from "./auth.middleware.factory";

export const makeHonoAuthMiddleware = () => {
  const authMiddleware = makeAuthMiddleware();
  return createHonoAuthMiddleware(authMiddleware);
};
