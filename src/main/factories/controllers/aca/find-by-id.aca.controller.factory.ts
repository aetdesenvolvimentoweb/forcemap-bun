import { FindByIdACAController } from "../../../../presentation/controllers";
import { ControllerProtocol } from "../../../../presentation/protocols";
import { makeLogger } from "../../logger";
import { makeFindByIdACAService } from "../../services";

export const makeFindByIdACAController = (): ControllerProtocol => {
  const logger = makeLogger();
  const findByIdACAService = makeFindByIdACAService();

  return new FindByIdACAController({
    findByIdACAService,
    logger,
  });
};
