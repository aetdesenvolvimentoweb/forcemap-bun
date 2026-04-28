import { CreateACAController } from "../../../../presentation/controllers";
import { ControllerProtocol } from "../../../../presentation/protocols";
import { makeLogger } from "../../logger";
import { makeCreateACAService } from "../../services";

export const makeCreateACAController = (): ControllerProtocol => {
  const logger = makeLogger();
  const createACAService = makeCreateACAService();

  return new CreateACAController({
    createACAService,
    logger,
  });
};
