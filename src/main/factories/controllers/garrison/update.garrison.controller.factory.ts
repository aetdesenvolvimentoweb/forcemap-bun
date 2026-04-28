import { UpdateGarrisonController } from "../../../../presentation/controllers";
import { ControllerProtocol } from "../../../../presentation/protocols";
import { makeLogger } from "../../logger";
import { makeUpdateGarrisonService } from "../../services";

export const makeUpdateGarrisonController = (): ControllerProtocol => {
  const logger = makeLogger();
  const updateGarrisonService = makeUpdateGarrisonService();

  return new UpdateGarrisonController({
    updateGarrisonService,
    logger,
  });
};
