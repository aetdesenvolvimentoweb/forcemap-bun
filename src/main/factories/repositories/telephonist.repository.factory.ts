import {
  MilitaryRepository,
  TelephonistRepository,
} from "../../../domain/repositories";
import { TelephonistRepositoryInMemory } from "../../../infra/repositories";

let instance: TelephonistRepositoryInMemory | null = null;

export const makeTelephonistRepository = (
  militaryRepository: MilitaryRepository,
): TelephonistRepository => {
  if (!instance) {
    instance = new TelephonistRepositoryInMemory(militaryRepository);
  }
  return instance;
};
