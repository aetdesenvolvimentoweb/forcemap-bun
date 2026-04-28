import { UpdateACAController } from "../../../../presentation/controllers";
import { ControllerProtocol } from "../../../../presentation/protocols";
import { makeLogger } from "../../logger";
import { makeUpdateACAService } from "../../services";

export const makeUpdateACAController = (): ControllerProtocol => {
  const logger = makeLogger();
  const updateACAService = makeUpdateACAService();

  return new UpdateACAController({
    updateACAService,
    logger,
  });
};
