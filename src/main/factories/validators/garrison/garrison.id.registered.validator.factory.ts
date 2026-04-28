import { GarrisonIdRegisteredValidatorProtocol } from "../../../../application/protocols";
import { GarrisonIdRegisteredValidator } from "../../../../application/validators";
import { GarrisonRepository } from "../../../../domain/repositories";

export const makeGarrisonIdRegisteredValidator = (
  garrisonRepository: GarrisonRepository,
): GarrisonIdRegisteredValidatorProtocol => {
  return new GarrisonIdRegisteredValidator({
    garrisonRepository,
  });
};
