import { ListAllOfficerController } from "../../../../presentation/controllers";
import { ControllerProtocol } from "../../../../presentation/protocols";
import { makeLogger } from "../../logger";
import { makeListAllOfficerService } from "../../services";

export const makeListAllOfficerController = (): ControllerProtocol => {
  const logger = makeLogger();
  const listAllOfficerService = makeListAllOfficerService();

  return new ListAllOfficerController({
    listAllOfficerService,
    logger,
  });
};
