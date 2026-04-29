import { ListAllTelephonistController } from "../../../../presentation/controllers";
import { ControllerProtocol } from "../../../../presentation/protocols";
import { makeLogger } from "../../logger";
import { makeListAllTelephonistService } from "../../services";

export const makeListAllTelephonistController = (): ControllerProtocol => {
  const logger = makeLogger();
  const listAllTelephonistService = makeListAllTelephonistService();

  return new ListAllTelephonistController({
    listAllTelephonistService,
    logger,
  });
};
