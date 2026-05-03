import { ListAllGarrisonService } from "../../../../application/services";
import { GenericServiceFactory } from "../../common";
import {
  makeGarrisonRepository,
  makeMilitaryRankRepository,
  makeMilitaryRepository,
  makeVehicleRepository,
} from "../../repositories";

export const makeListAllGarrisonService = (): ListAllGarrisonService => {
  const militaryRankRepository = makeMilitaryRankRepository();
  const militaryRepository = makeMilitaryRepository(militaryRankRepository);
  const vehicleRepository = makeVehicleRepository();
  const garrisonRepository = makeGarrisonRepository(
    militaryRepository,
    vehicleRepository,
  );

  return GenericServiceFactory.listAllService({
    ServiceClass: ListAllGarrisonService,
    repositoryMaker: () => garrisonRepository,
    repositoryKey: "garrisonRepository",
  });
};
