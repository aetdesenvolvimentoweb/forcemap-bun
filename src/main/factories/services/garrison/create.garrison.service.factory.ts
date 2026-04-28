import { CreateGarrisonService } from "../../../../application/services";
import { GenericServiceFactory } from "../../common";
import {
  makeGarrisonRepository,
  makeMilitaryRankRepository,
  makeMilitaryRepository,
} from "../../repositories";
import { makeGarrisonInputDTOSanitizer } from "../../sanitizers";
import { makeGarrisonInputDTOValidator } from "../../validators";

export const makeCreateGarrisonService = (): CreateGarrisonService => {
  const militaryRankRepository = makeMilitaryRankRepository();
  const militaryRepository = makeMilitaryRepository(militaryRankRepository);
  const garrisonRepository = makeGarrisonRepository(militaryRepository);

  return GenericServiceFactory.createService({
    ServiceClass: CreateGarrisonService,
    repositoryMaker: () => garrisonRepository,
    sanitizerMaker: makeGarrisonInputDTOSanitizer,
    validatorMaker: () => makeGarrisonInputDTOValidator(garrisonRepository),
    repositoryKey: "garrisonRepository",
  });
};
