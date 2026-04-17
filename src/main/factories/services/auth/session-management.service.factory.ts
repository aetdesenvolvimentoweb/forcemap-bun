import { SessionManagementService } from "../../../../application/services";
import { makeSessionRepository } from "../../repositories";
import { makeTokenHandler } from "../../token-handler";

export const makeSessionManagementService = (): SessionManagementService => {
  const sessionRepository = makeSessionRepository();
  const tokenHandler = makeTokenHandler();

  return new SessionManagementService({
    sessionRepository,
    tokenHandler,
  });
};
