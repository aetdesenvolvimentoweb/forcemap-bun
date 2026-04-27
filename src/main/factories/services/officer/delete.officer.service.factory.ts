import { DeleteOfficerService } from "../../../../application/services";
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

export const makeDeleteOfficerService = (): DeleteOfficerService => {
  // Complex dependencies that need custom setup
  const militaryRankRepository = makeMilitaryRankRepository();
  const militaryRepository = makeMilitaryRepository(militaryRankRepository);
  const officerRepository = makeOfficerRepository(militaryRepository);

  return GenericServiceFactory.deleteService({
    ServiceClass: DeleteOfficerService,
    repositoryMaker: () => officerRepository,
    idSanitizerMaker: makeIdSanitizer,
    idValidatorMaker: makeIdValidator,
    idRegisteredValidatorMaker: () =>
      makeOfficerIdRegisteredValidator(officerRepository),
    repositoryKey: "officerRepository",
  });
};
