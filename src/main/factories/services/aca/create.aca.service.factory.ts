import { CreateACAService } from "../../../../application/services";
import { GenericServiceFactory } from "../../common";
import {
  makeACARepository,
  makeMilitaryRankRepository,
  makeMilitaryRepository,
} from "../../repositories";
import { makeACAInputDTOSanitizer } from "../../sanitizers";
import { makeACAInputDTOValidator } from "../../validators";

export const makeCreateACAService = (): CreateACAService => {
  const militaryRankRepository = makeMilitaryRankRepository();
  const militaryRepository = makeMilitaryRepository(militaryRankRepository);
  const acaRepository = makeACARepository(militaryRepository);

  return GenericServiceFactory.createService({
    ServiceClass: CreateACAService,
    repositoryMaker: () => acaRepository,
    sanitizerMaker: makeACAInputDTOSanitizer,
    validatorMaker: () => makeACAInputDTOValidator(acaRepository),
    repositoryKey: "acaRepository",
  });
};
