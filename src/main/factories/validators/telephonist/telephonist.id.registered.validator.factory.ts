import { TelephonistIdRegisteredValidatorProtocol } from "../../../../application/protocols";
import { TelephonistIdRegisteredValidator } from "../../../../application/validators";
import { TelephonistRepository } from "../../../../domain/repositories";

export const makeTelephonistIdRegisteredValidator = (
  telephonistRepository: TelephonistRepository,
): TelephonistIdRegisteredValidatorProtocol => {
  return new TelephonistIdRegisteredValidator({
    telephonistRepository,
  });
};
