import { FindByIdOfficerController } from "../../../../presentation/controllers";
import { ControllerProtocol } from "../../../../presentation/protocols";
import { makeLogger } from "../../logger";
import { makeFindByIdOfficerService } from "../../services";

export const makeFindByIdOfficerController = (): ControllerProtocol => {
  const logger = makeLogger();
  const findByIdOfficerService = makeFindByIdOfficerService();

  return new FindByIdOfficerController({
    findByIdOfficerService,
    logger,
  });
};
