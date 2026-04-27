import { DeleteOfficerController } from "../../../../presentation/controllers";
import { ControllerProtocol } from "../../../../presentation/protocols";
import { makeLogger } from "../../logger";
import { makeDeleteOfficerService } from "../../services";

export const makeDeleteOfficerController = (): ControllerProtocol => {
  const logger = makeLogger();
  const deleteOfficerService = makeDeleteOfficerService();

  return new DeleteOfficerController({
    deleteOfficerService,
    logger,
  });
};
