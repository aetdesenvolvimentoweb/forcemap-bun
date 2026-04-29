import { UpdateTelephonistController } from "../../../../presentation/controllers";
import { ControllerProtocol } from "../../../../presentation/protocols";
import { makeLogger } from "../../logger";
import { makeUpdateTelephonistService } from "../../services";

export const makeUpdateTelephonistController = (): ControllerProtocol => {
  const logger = makeLogger();
  const updateTelephonistService = makeUpdateTelephonistService();

  return new UpdateTelephonistController({
    updateTelephonistService,
    logger,
  });
};
