import { DeleteGarrisonService } from "../../../../application/services";
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

export const makeDeleteGarrisonService = (): DeleteGarrisonService => {
  // Complex dependencies that need custom setup
  const militaryRankRepository = makeMilitaryRankRepository();
  const militaryRepository = makeMilitaryRepository(militaryRankRepository);
  const vehicleRepository = makeVehicleRepository();
  const garrisonRepository = makeGarrisonRepository(
    militaryRepository,
    vehicleRepository,
  );

  return GenericServiceFactory.deleteService({
    ServiceClass: DeleteGarrisonService,
    repositoryMaker: () => garrisonRepository,
    idSanitizerMaker: makeIdSanitizer,
    idValidatorMaker: makeIdValidator,
    idRegisteredValidatorMaker: () =>
      makeGarrisonIdRegisteredValidator(garrisonRepository),
    repositoryKey: "garrisonRepository",
  });
};
