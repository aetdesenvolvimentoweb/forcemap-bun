import { TelephonistInputDTOValidatorProtocol } from "../../../../application/protocols";
import { TelephonistInputDTOValidator } from "../../../../application/validators";
import { TelephonistRepository } from "../../../../domain/repositories";
import {
  makeMilitaryRankRepository,
  makeMilitaryRepository,
} from "../../repositories";
import { makeIdValidator } from "../id.validator.factory";

export const makeTelephonistInputDTOValidator = (
  telephonistRepository: TelephonistRepository,
): TelephonistInputDTOValidatorProtocol => {
  return new TelephonistInputDTOValidator({
    telephonistRepository,
    idValidator: makeIdValidator(),
    militaryRepository: makeMilitaryRepository(makeMilitaryRankRepository()),
  });
};
