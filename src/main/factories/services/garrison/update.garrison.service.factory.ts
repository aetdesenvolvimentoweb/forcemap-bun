import { UpdateGarrisonService } from "../../../../application/services";
import {
  makeGarrisonRepository,
  makeMilitaryRankRepository,
  makeMilitaryRepository,
  makeVehicleRepository,
} from "../../repositories";
import {
  makeGarrisonInputDTOSanitizer,
  makeIdSanitizer,
} from "../../sanitizers";
import {
  makeGarrisonIdRegisteredValidator,
  makeGarrisonInputDTOValidator,
  makeIdValidator,
} from "../../validators";

export const makeUpdateGarrisonService = (): UpdateGarrisonService => {
  const militaryRankRepository = makeMilitaryRankRepository();
  const militaryRepository = makeMilitaryRepository(militaryRankRepository);
  const vehicleRepository = makeVehicleRepository();
  const garrisonRepository = makeGarrisonRepository(
    militaryRepository,
    vehicleRepository,
  );

  // Custom implementation for Update service due to different parameter names
  return new UpdateGarrisonService({
    garrisonRepository,
    idSanitizer: makeIdSanitizer(),
    dataSanitizer: makeGarrisonInputDTOSanitizer(),
    idValidator: makeIdValidator(),
    idRegisteredValidator:
      makeGarrisonIdRegisteredValidator(garrisonRepository),
    dataValidator: makeGarrisonInputDTOValidator(garrisonRepository),
  });
};
