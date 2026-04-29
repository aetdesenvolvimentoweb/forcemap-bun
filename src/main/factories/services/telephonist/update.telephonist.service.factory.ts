import { UpdateTelephonistService } from "../../../../application/services";
import {
  makeMilitaryRankRepository,
  makeMilitaryRepository,
  makeTelephonistRepository,
} from "../../repositories";
import {
  makeIdSanitizer,
  makeTelephonistInputDTOSanitizer,
} from "../../sanitizers";
import {
  makeIdValidator,
  makeTelephonistIdRegisteredValidator,
  makeTelephonistInputDTOValidator,
} from "../../validators";

export const makeUpdateTelephonistService = (): UpdateTelephonistService => {
  const militaryRankRepository = makeMilitaryRankRepository();
  const militaryRepository = makeMilitaryRepository(militaryRankRepository);
  const telephonistRepository = makeTelephonistRepository(militaryRepository);

  // Custom implementation for Update service due to different parameter names
  return new UpdateTelephonistService({
    telephonistRepository,
    idSanitizer: makeIdSanitizer(),
    dataSanitizer: makeTelephonistInputDTOSanitizer(),
    idValidator: makeIdValidator(),
    idRegisteredValidator: makeTelephonistIdRegisteredValidator(
      telephonistRepository,
    ),
    dataValidator: makeTelephonistInputDTOValidator(telephonistRepository),
  });
};
