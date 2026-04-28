import { CreateGarrisonController } from "../../../../presentation/controllers";
import { ControllerProtocol } from "../../../../presentation/protocols";
import { makeLogger } from "../../logger";
import { makeCreateGarrisonService } from "../../services";

export const makeCreateGarrisonController = (): ControllerProtocol => {
  const logger = makeLogger();
  const createGarrisonService = makeCreateGarrisonService();

  return new CreateGarrisonController({
    createGarrisonService,
    logger,
  });
};
