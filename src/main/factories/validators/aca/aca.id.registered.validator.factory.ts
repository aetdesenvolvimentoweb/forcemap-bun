import { ACAIdRegisteredValidatorProtocol } from "../../../../application/protocols";
import { ACAIdRegisteredValidator } from "../../../../application/validators";
import { ACARepository } from "../../../../domain/repositories";

export const makeACAIdRegisteredValidator = (
  acaRepository: ACARepository,
): ACAIdRegisteredValidatorProtocol => {
  return new ACAIdRegisteredValidator({
    acaRepository,
  });
};
