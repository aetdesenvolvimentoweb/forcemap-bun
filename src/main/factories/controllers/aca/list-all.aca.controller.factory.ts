import { ListAllACAController } from "../../../../presentation/controllers";
import { ControllerProtocol } from "../../../../presentation/protocols";
import { makeLogger } from "../../logger";
import { makeListAllACAService } from "../../services";

export const makeListAllACAController = (): ControllerProtocol => {
  const logger = makeLogger();
  const listAllACAService = makeListAllACAService();

  return new ListAllACAController({
    listAllACAService,
    logger,
  });
};
