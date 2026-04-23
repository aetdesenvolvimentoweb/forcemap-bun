import { DeleteVehicleService } from "../../../../application/services";
import { GenericServiceFactory } from "../../common";
import { makeVehicleRepository } from "../../repositories";
import { makeIdSanitizer } from "../../sanitizers";
import {
  makeIdValidator,
  makeVehicleIdRegisteredValidator,
} from "../../validators";

export const makeDeleteVehicleService = (): DeleteVehicleService => {
  const vehicleRepository = makeVehicleRepository();

  return GenericServiceFactory.deleteService({
    ServiceClass: DeleteVehicleService,
    repositoryMaker: () => vehicleRepository,
    idSanitizerMaker: makeIdSanitizer,
    idValidatorMaker: makeIdValidator,
    idRegisteredValidatorMaker: () =>
      makeVehicleIdRegisteredValidator(vehicleRepository),
    repositoryKey: "vehicleRepository",
  });
};
