import { AuthMiddleware } from "../../../presentation/middlewares";
import { makeLogger } from "../logger";
import { makeSessionRepository } from "../repositories";
import { makeTokenValidator } from "../validators/auth";

export const makeAuthMiddleware = (): AuthMiddleware => {
  const tokenValidator = makeTokenValidator();
  const sessionRepository = makeSessionRepository();
  const logger = makeLogger();

  return new AuthMiddleware({
    tokenValidator,
    sessionRepository,
    logger,
  });
};
