import { DeleteGarrisonController } from "../../../../presentation/controllers";
import { ControllerProtocol } from "../../../../presentation/protocols";
import { makeLogger } from "../../logger";
import { makeDeleteGarrisonService } from "../../services";

export const makeDeleteGarrisonController = (): ControllerProtocol => {
  const logger = makeLogger();
  const deleteGarrisonService = makeDeleteGarrisonService();

  return new DeleteGarrisonController({
    deleteGarrisonService,
    logger,
  });
};
