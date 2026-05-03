import {
  GarrisonRepository,
  MilitaryRepository,
  VehicleRepository,
} from "../../../domain/repositories";
import { GarrisonRepositoryInMemory } from "../../../infra/repositories";

let instance: GarrisonRepositoryInMemory | null = null;

export const makeGarrisonRepository = (
  militaryRepository: MilitaryRepository,
  vehicleRepository: VehicleRepository,
): GarrisonRepository => {
  if (!instance) {
    instance = new GarrisonRepositoryInMemory(
      militaryRepository,
      vehicleRepository,
    );
  }
  return instance;
};
