import { UpdateOfficerController } from "../../../../presentation/controllers";
import { ControllerProtocol } from "../../../../presentation/protocols";
import { makeLogger } from "../../logger";
import { makeUpdateOfficerService } from "../../services";

export const makeUpdateOfficerController = (): ControllerProtocol => {
  const logger = makeLogger();
  const updateOfficerService = makeUpdateOfficerService();

  return new UpdateOfficerController({
    updateOfficerService,
    logger,
  });
};
