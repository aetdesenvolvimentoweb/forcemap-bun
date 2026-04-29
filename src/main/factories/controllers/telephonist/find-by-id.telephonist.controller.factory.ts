import { FindByIdTelephonistController } from "../../../../presentation/controllers";
import { ControllerProtocol } from "../../../../presentation/protocols";
import { makeLogger } from "../../logger";
import { makeFindByIdTelephonistService } from "../../services";

export const makeFindByIdTelephonistController = (): ControllerProtocol => {
  const logger = makeLogger();
  const findByIdTelephonistService = makeFindByIdTelephonistService();

  return new FindByIdTelephonistController({
    findByIdTelephonistService,
    logger,
  });
};
