import { CreateOfficerController } from "../../../../presentation/controllers";
import { ControllerProtocol } from "../../../../presentation/protocols";
import { makeLogger } from "../../logger";
import { makeCreateOfficerService } from "../../services";

export const makeCreateOfficerController = (): ControllerProtocol => {
  const logger = makeLogger();
  const createOfficerService = makeCreateOfficerService();

  return new CreateOfficerController({
    createOfficerService,
    logger,
  });
};
