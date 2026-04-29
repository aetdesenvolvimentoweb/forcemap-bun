import { CreateTelephonistService } from "../../../../application/services";
import { GenericServiceFactory } from "../../common";
import {
  makeMilitaryRankRepository,
  makeMilitaryRepository,
  makeTelephonistRepository,
} from "../../repositories";
import { makeTelephonistInputDTOSanitizer } from "../../sanitizers";
import { makeTelephonistInputDTOValidator } from "../../validators";

export const makeCreateTelephonistService = (): CreateTelephonistService => {
  const militaryRankRepository = makeMilitaryRankRepository();
  const militaryRepository = makeMilitaryRepository(militaryRankRepository);
  const telephonistRepository = makeTelephonistRepository(militaryRepository);

  return GenericServiceFactory.createService({
    ServiceClass: CreateTelephonistService,
    repositoryMaker: () => telephonistRepository,
    sanitizerMaker: makeTelephonistInputDTOSanitizer,
    validatorMaker: () =>
      makeTelephonistInputDTOValidator(telephonistRepository),
    repositoryKey: "telephonistRepository",
  });
};
