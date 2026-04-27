import { CreateOfficerService } from "../../../../application/services";
import { GenericServiceFactory } from "../../common";
import {
  makeMilitaryRankRepository,
  makeMilitaryRepository,
  makeOfficerRepository,
} from "../../repositories";
import { makeOfficerInputDTOSanitizer } from "../../sanitizers";
import { makeOfficerInputDTOValidator } from "../../validators";

export const makeCreateOfficerService = (): CreateOfficerService => {
  const militaryRankRepository = makeMilitaryRankRepository();
  const militaryRepository = makeMilitaryRepository(militaryRankRepository);
  const officerRepository = makeOfficerRepository(militaryRepository);

  return GenericServiceFactory.createService({
    ServiceClass: CreateOfficerService,
    repositoryMaker: () => officerRepository,
    sanitizerMaker: makeOfficerInputDTOSanitizer,
    validatorMaker: () => makeOfficerInputDTOValidator(officerRepository),
    repositoryKey: "officerRepository",
  });
};
