import { CreateVehicleService } from "../../../../application/services";
import { GenericServiceFactory } from "../../common";
import { makeVehicleRepository } from "../../repositories";
import { makeVehicleInputDTOSanitizer } from "../../sanitizers";
import { makeVehicleInputDTOValidator } from "../../validators";

export const makeCreateVehicleService = (): CreateVehicleService => {
  return GenericServiceFactory.createService({
    ServiceClass: CreateVehicleService,
    repositoryMaker: makeVehicleRepository,
    sanitizerMaker: makeVehicleInputDTOSanitizer,
    validatorMaker: makeVehicleInputDTOValidator,
    repositoryKey: "vehicleRepository",
  });
};
