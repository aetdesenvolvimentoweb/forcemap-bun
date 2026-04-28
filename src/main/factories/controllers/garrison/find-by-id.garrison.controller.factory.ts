import { FindByIdGarrisonController } from "../../../../presentation/controllers";
import { ControllerProtocol } from "../../../../presentation/protocols";
import { makeLogger } from "../../logger";
import { makeFindByIdGarrisonService } from "../../services";

export const makeFindByIdGarrisonController = (): ControllerProtocol => {
  const logger = makeLogger();
  const findByIdGarrisonService = makeFindByIdGarrisonService();

  return new FindByIdGarrisonController({
    findByIdGarrisonService,
    logger,
  });
};
