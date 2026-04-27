import { UpdateOfficerService } from "../../../../application/services";
import {
  makeMilitaryRankRepository,
  makeMilitaryRepository,
  makeOfficerRepository,
} from "../../repositories";
import {
  makeIdSanitizer,
  makeOfficerInputDTOSanitizer,
} from "../../sanitizers";
import {
  makeIdValidator,
  makeOfficerIdRegisteredValidator,
  makeOfficerInputDTOValidator,
} from "../../validators";

export const makeUpdateOfficerService = (): UpdateOfficerService => {
  const militaryRankRepository = makeMilitaryRankRepository();
  const militaryRepository = makeMilitaryRepository(militaryRankRepository);
  const officerRepository = makeOfficerRepository(militaryRepository);

  // Custom implementation for Update service due to different parameter names
  return new UpdateOfficerService({
    officerRepository,
    idSanitizer: makeIdSanitizer(),
    dataSanitizer: makeOfficerInputDTOSanitizer(),
    idValidator: makeIdValidator(),
    idRegisteredValidator: makeOfficerIdRegisteredValidator(officerRepository),
    dataValidator: makeOfficerInputDTOValidator(officerRepository),
  });
};
