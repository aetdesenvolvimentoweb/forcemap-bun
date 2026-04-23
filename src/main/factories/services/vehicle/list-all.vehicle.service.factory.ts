import { ListAllVehicleService } from "../../../../application/services";
import { GenericServiceFactory } from "../../common";
import { makeVehicleRepository } from "../../repositories";

export const makeListAllVehicleService = (): ListAllVehicleService => {
  return GenericServiceFactory.listAllService({
    ServiceClass: ListAllVehicleService,
    repositoryMaker: makeVehicleRepository,
    repositoryKey: "vehicleRepository",
  });
};
