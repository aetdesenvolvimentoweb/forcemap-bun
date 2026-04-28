import { ListAllGarrisonController } from "../../../../presentation/controllers";
import { ControllerProtocol } from "../../../../presentation/protocols";
import { makeLogger } from "../../logger";
import { makeListAllGarrisonService } from "../../services";

export const makeListAllGarrisonController = (): ControllerProtocol => {
  const logger = makeLogger();
  const listAllGarrisonService = makeListAllGarrisonService();

  return new ListAllGarrisonController({
    listAllGarrisonService,
    logger,
  });
};
