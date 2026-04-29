import { CreateTelephonistController } from "../../../../presentation/controllers";
import { ControllerProtocol } from "../../../../presentation/protocols";
import { makeLogger } from "../../logger";
import { makeCreateTelephonistService } from "../../services";

export const makeCreateTelephonistController = (): ControllerProtocol => {
  const logger = makeLogger();
  const createTelephonistService = makeCreateTelephonistService();

  return new CreateTelephonistController({
    createTelephonistService,
    logger,
  });
};
