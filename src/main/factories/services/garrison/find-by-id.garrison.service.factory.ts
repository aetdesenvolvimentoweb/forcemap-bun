import { FindByIdGarrisonService } from "../../../../application/services";
import { GenericServiceFactory } from "../../common";
import {
  makeGarrisonRepository,
  makeMilitaryRankRepository,
  makeMilitaryRepository,
  makeVehicleRepository,
} from "../../repositories";
import { makeIdSanitizer } from "../../sanitizers";
import {
  makeGarrisonIdRegisteredValidator,
  makeIdValidator,
} from "../../validators";

export const makeFindByIdGarrisonService = (): FindByIdGarrisonService => {
  const militaryRankRepository = makeMilitaryRankRepository();
  const militaryRepository = makeMilitaryRepository(militaryRankRepository);
  const vehicleRepository = makeVehicleRepository();
  const garrisonRepository = makeGarrisonRepository(
    militaryRepository,
    vehicleRepository,
  );

  return GenericServiceFactory.findByIdService({
    ServiceClass: FindByIdGarrisonService,
    repositoryMaker: () => garrisonRepository,
    idSanitizerMaker: makeIdSanitizer,
    idValidatorMaker: makeIdValidator,
    idRegisteredValidatorMaker: () =>
      makeGarrisonIdRegisteredValidator(garrisonRepository),
    repositoryKey: "garrisonRepository",
  });
};
