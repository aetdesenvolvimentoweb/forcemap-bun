import { FindByIdTelephonistService } from "../../../../application/services";
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

export const makeFindByIdTelephonistService =
  (): FindByIdTelephonistService => {
    const militaryRankRepository = makeMilitaryRankRepository();
    const militaryRepository = makeMilitaryRepository(militaryRankRepository);
    const telephonistRepository = makeTelephonistRepository(militaryRepository);

    return GenericServiceFactory.findByIdService({
      ServiceClass: FindByIdTelephonistService,
      repositoryMaker: () => telephonistRepository,
      idSanitizerMaker: makeIdSanitizer,
      idValidatorMaker: makeIdValidator,
      idRegisteredValidatorMaker: () =>
        makeTelephonistIdRegisteredValidator(telephonistRepository),
      repositoryKey: "telephonistRepository",
    });
  };
