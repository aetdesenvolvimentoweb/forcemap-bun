import { DeleteACAService } from "../../../../application/services";
import { GenericServiceFactory } from "../../common";
import {
  makeACARepository,
  makeMilitaryRankRepository,
  makeMilitaryRepository,
} from "../../repositories";
import { makeIdSanitizer } from "../../sanitizers";
import {
  makeACAIdRegisteredValidator,
  makeIdValidator,
} from "../../validators";

export const makeDeleteACAService = (): DeleteACAService => {
  // Complex dependencies that need custom setup
  const militaryRankRepository = makeMilitaryRankRepository();
  const militaryRepository = makeMilitaryRepository(militaryRankRepository);
  const acaRepository = makeACARepository(militaryRepository);

  return GenericServiceFactory.deleteService({
    ServiceClass: DeleteACAService,
    repositoryMaker: () => acaRepository,
    idSanitizerMaker: makeIdSanitizer,
    idValidatorMaker: makeIdValidator,
    idRegisteredValidatorMaker: () =>
      makeACAIdRegisteredValidator(acaRepository),
    repositoryKey: "acaRepository",
  });
};
