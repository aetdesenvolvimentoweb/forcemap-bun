import { OfficerInputDTOValidatorProtocol } from "../../../../application/protocols";
import { OfficerInputDTOValidator } from "../../../../application/validators";
import { OfficerRepository } from "../../../../domain/repositories";
import {
  makeMilitaryRankRepository,
  makeMilitaryRepository,
} from "../../repositories";
import { makeIdValidator } from "../id.validator.factory";

export const makeOfficerInputDTOValidator = (
  officerRepository: OfficerRepository,
): OfficerInputDTOValidatorProtocol => {
  return new OfficerInputDTOValidator({
    officerRepository,
    idValidator: makeIdValidator(),
    militaryRepository: makeMilitaryRepository(makeMilitaryRankRepository()),
  });
};
