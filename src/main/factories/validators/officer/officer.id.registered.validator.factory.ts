import { OfficerIdRegisteredValidatorProtocol } from "../../../../application/protocols";
import { OfficerIdRegisteredValidator } from "../../../../application/validators";
import { OfficerRepository } from "../../../../domain/repositories";

export const makeOfficerIdRegisteredValidator = (
  officerRepository: OfficerRepository,
): OfficerIdRegisteredValidatorProtocol => {
  return new OfficerIdRegisteredValidator({
    officerRepository,
  });
};
