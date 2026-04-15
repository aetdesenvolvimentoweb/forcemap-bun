import { CreateMilitaryRankService } from "../../../../application/services";
import { GenericServiceFactory } from "../../common";
import { makeMilitaryRankRepository } from "../../repositories";
import { makeMilitaryRankInputDTOSanitizer } from "../../sanitizers";
import { makeMilitaryRankInputDTOValidator } from "../../validators";

export const makeCreateMilitaryRankService = (): CreateMilitaryRankService => {
  return GenericServiceFactory.createService({
    ServiceClass: CreateMilitaryRankService,
    repositoryMaker: makeMilitaryRankRepository,
    sanitizerMaker: makeMilitaryRankInputDTOSanitizer,
    validatorMaker: makeMilitaryRankInputDTOValidator,
    repositoryKey: "militaryRankRepository",
  });
};
