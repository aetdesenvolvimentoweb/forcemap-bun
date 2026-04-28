import { UpdateACAService } from "../../../../application/services";
import {
  makeACARepository,
  makeMilitaryRankRepository,
  makeMilitaryRepository,
} from "../../repositories";
import { makeACAInputDTOSanitizer, makeIdSanitizer } from "../../sanitizers";
import {
  makeACAIdRegisteredValidator,
  makeACAInputDTOValidator,
  makeIdValidator,
} from "../../validators";

export const makeUpdateACAService = (): UpdateACAService => {
  const militaryRankRepository = makeMilitaryRankRepository();
  const militaryRepository = makeMilitaryRepository(militaryRankRepository);
  const acaRepository = makeACARepository(militaryRepository);

  // Custom implementation for Update service due to different parameter names
  return new UpdateACAService({
    acaRepository,
    idSanitizer: makeIdSanitizer(),
    dataSanitizer: makeACAInputDTOSanitizer(),
    idValidator: makeIdValidator(),
    idRegisteredValidator: makeACAIdRegisteredValidator(acaRepository),
    dataValidator: makeACAInputDTOValidator(acaRepository),
  });
};
