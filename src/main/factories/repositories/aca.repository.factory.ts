import {
  ACARepository,
  MilitaryRepository,
} from "../../../domain/repositories";
import { ACARepositoryInMemory } from "../../../infra/repositories";

let instance: ACARepositoryInMemory | null = null;

export const makeACARepository = (
  militaryRepository: MilitaryRepository,
): ACARepository => {
  if (!instance) {
    instance = new ACARepositoryInMemory(militaryRepository);
  }
  return instance;
};
