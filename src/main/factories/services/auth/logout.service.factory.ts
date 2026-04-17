import { LogoutService } from "../../../../application/services";
import { makeSecurityLogger } from "../../logger";
import { makeSessionRepository } from "../../repositories";

export const makeLogoutService = (): LogoutService => {
  const sessionRepository = makeSessionRepository();
  const securityLogger = makeSecurityLogger();

  return new LogoutService({
    sessionRepository,
    securityLogger,
  });
};
