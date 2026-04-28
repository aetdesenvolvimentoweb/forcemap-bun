import { DeleteACAController } from "../../../../presentation/controllers";
import { ControllerProtocol } from "../../../../presentation/protocols";
import { makeLogger } from "../../logger";
import { makeDeleteACAService } from "../../services";

export const makeDeleteACAController = (): ControllerProtocol => {
  const logger = makeLogger();
  const deleteACAService = makeDeleteACAService();

  return new DeleteACAController({
    deleteACAService,
    logger,
  });
};
