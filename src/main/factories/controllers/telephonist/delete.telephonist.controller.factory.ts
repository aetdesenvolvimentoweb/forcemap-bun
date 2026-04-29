import { DeleteTelephonistController } from "../../../../presentation/controllers";
import { ControllerProtocol } from "../../../../presentation/protocols";
import { makeLogger } from "../../logger";
import { makeDeleteTelephonistService } from "../../services";

export const makeDeleteTelephonistController = (): ControllerProtocol => {
  const logger = makeLogger();
  const deleteTelephonistService = makeDeleteTelephonistService();

  return new DeleteTelephonistController({
    deleteTelephonistService,
    logger,
  });
};
