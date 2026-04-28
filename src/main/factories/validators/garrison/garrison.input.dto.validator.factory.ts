import { GarrisonInputDTOValidatorProtocol } from "../../../../application/protocols";
import { GarrisonInputDTOValidator } from "../../../../application/validators";
import { GarrisonRepository } from "../../../../domain/repositories";
import {
  makeMilitaryRankRepository,
  makeMilitaryRepository,
  makeVehicleRepository,
} from "../../repositories";
import { makeIdValidator } from "../id.validator.factory";

export const makeGarrisonInputDTOValidator = (
  vehicleRepository: GarrisonRepository,
): GarrisonInputDTOValidatorProtocol => {
  const militaryRankRepository = makeMilitaryRankRepository();
  return new GarrisonInputDTOValidator({
    idValidator: makeIdValidator(),
    vehicleRepository: makeVehicleRepository(),
    militaryRepository: makeMilitaryRepository(militaryRankRepository),
  });
};
