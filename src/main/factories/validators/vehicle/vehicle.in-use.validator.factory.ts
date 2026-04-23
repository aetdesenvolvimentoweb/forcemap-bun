import { VehicleInUseValidatorProtocol } from "../../../../application/protocols";
import { VehicleInUseValidator } from "../../../../application/validators";
import { GarrisonRepository } from "../../../../domain/repositories";

export const makeVehicleInUseValidator = (
  garrisonRepository: GarrisonRepository,
): VehicleInUseValidatorProtocol => {
  return new VehicleInUseValidator({
    garrisonRepository,
  });
};
