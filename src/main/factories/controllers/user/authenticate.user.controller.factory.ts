import { AuthenticateUserController } from "../../../../presentation/controllers";
import { ControllerProtocol } from "../../../../presentation/protocols";
import { makeLogger } from "../../logger";
import { makeAuthenticateUserService } from "../../services";

export const makeAuthenticateUserController = (): ControllerProtocol => {
  const logger = makeLogger();
  const authenticateUserService = makeAuthenticateUserService();

  return new AuthenticateUserController({
    authenticateUserService,
    logger,
  });
};
