import {
  GarrisonRepository,
  MilitaryRepository,
} from "../../../domain/repositories";
import { GarrisonRepositoryInMemory } from "../../../infra/repositories";

let instance: GarrisonRepositoryInMemory | null = null;

export const makeGarrisonRepository = (
  militaryRepository: MilitaryRepository,
): GarrisonRepository => {
  if (!instance) {
    instance = new GarrisonRepositoryInMemory(militaryRepository);
  }
  return instance;
};
