import { DeleteVehicleService } from "../../../../application/services";
import { GenericServiceFactory } from "../../common";
import {
  makeVehicleRepository,
  makeGarrisonRepository,
} from "../../repositories";
import { makeIdSanitizer } from "../../sanitizers";
import {
  makeIdValidator,
  makeVehicleIdRegisteredValidator,
  makeVehicleInUseValidator,
} from "../../validators";

export const makeDeleteVehicleService = (): DeleteVehicleService => {
  const vehicleRepository = makeVehicleRepository();
  const garrisonRepository = makeGarrisonRepository();

  return GenericServiceFactory.deleteService({
    ServiceClass: DeleteVehicleService,
    repositoryMaker: () => vehicleRepository,
    idSanitizerMaker: makeIdSanitizer,
    idValidatorMaker: makeIdValidator,
    idRegisteredValidatorMaker: () =>
      makeVehicleIdRegisteredValidator(vehicleRepository),
    inUseValidatorMaker: () => makeVehicleInUseValidator(vehicleRepository),
    repositoryKey: "vehicleRepository",
  });
};
