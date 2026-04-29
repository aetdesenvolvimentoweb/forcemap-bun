import { DeleteTelephonistService } from "../../../../application/services";
import { GenericServiceFactory } from "../../common";
import {
  makeMilitaryRankRepository,
  makeMilitaryRepository,
  makeTelephonistRepository,
} from "../../repositories";
import { makeIdSanitizer } from "../../sanitizers";
import {
  makeIdValidator,
  makeTelephonistIdRegisteredValidator,
} from "../../validators";

export const makeDeleteTelephonistService = (): DeleteTelephonistService => {
  // Complex dependencies that need custom setup
  const militaryRankRepository = makeMilitaryRankRepository();
  const militaryRepository = makeMilitaryRepository(militaryRankRepository);
  const telephonistRepository = makeTelephonistRepository(militaryRepository);

  return GenericServiceFactory.deleteService({
    ServiceClass: DeleteTelephonistService,
    repositoryMaker: () => telephonistRepository,
    idSanitizerMaker: makeIdSanitizer,
    idValidatorMaker: makeIdValidator,
    idRegisteredValidatorMaker: () =>
      makeTelephonistIdRegisteredValidator(telephonistRepository),
    repositoryKey: "telephonistRepository",
  });
};
