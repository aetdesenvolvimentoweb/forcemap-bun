import { ACAInputDTOValidatorProtocol } from "../../../../application/protocols";
import { ACAInputDTOValidator } from "../../../../application/validators";
import { ACARepository } from "../../../../domain/repositories";
import {
  makeMilitaryRankRepository,
  makeMilitaryRepository,
} from "../../repositories";
import { makeIdValidator } from "../id.validator.factory";

export const makeACAInputDTOValidator = (
  acaRepository: ACARepository,
): ACAInputDTOValidatorProtocol => {
  return new ACAInputDTOValidator({
    acaRepository,
    idValidator: makeIdValidator(),
    militaryRepository: makeMilitaryRepository(makeMilitaryRankRepository()),
  });
};
