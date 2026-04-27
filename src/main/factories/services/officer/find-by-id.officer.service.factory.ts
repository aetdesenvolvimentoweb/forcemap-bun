import { FindByIdOfficerService } from "../../../../application/services";
import { GenericServiceFactory } from "../../common";
import {
  makeMilitaryRankRepository,
  makeMilitaryRepository,
  makeOfficerRepository,
} from "../../repositories";
import { makeIdSanitizer } from "../../sanitizers";
import {
  makeIdValidator,
  makeOfficerIdRegisteredValidator,
} from "../../validators";

export const makeFindByIdOfficerService = (): FindByIdOfficerService => {
  const militaryRankRepository = makeMilitaryRankRepository();
  const militaryRepository = makeMilitaryRepository(militaryRankRepository);
  const officerRepository = makeOfficerRepository(militaryRepository);

  return GenericServiceFactory.findByIdService({
    ServiceClass: FindByIdOfficerService,
    repositoryMaker: () => officerRepository,
    idSanitizerMaker: makeIdSanitizer,
    idValidatorMaker: makeIdValidator,
    idRegisteredValidatorMaker: () =>
      makeOfficerIdRegisteredValidator(officerRepository),
    repositoryKey: "officerRepository",
  });
};
