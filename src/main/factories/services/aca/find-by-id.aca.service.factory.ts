import { FindByIdACAService } from "../../../../application/services";
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

export const makeFindByIdACAService = (): FindByIdACAService => {
  const militaryRankRepository = makeMilitaryRankRepository();
  const militaryRepository = makeMilitaryRepository(militaryRankRepository);
  const acaRepository = makeACARepository(militaryRepository);

  return GenericServiceFactory.findByIdService({
    ServiceClass: FindByIdACAService,
    repositoryMaker: () => acaRepository,
    idSanitizerMaker: makeIdSanitizer,
    idValidatorMaker: makeIdValidator,
    idRegisteredValidatorMaker: () =>
      makeACAIdRegisteredValidator(acaRepository),
    repositoryKey: "acaRepository",
  });
};
