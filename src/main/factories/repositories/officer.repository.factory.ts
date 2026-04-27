import {
  MilitaryRepository,
  OfficerRepository,
} from "../../../domain/repositories";
import { OfficerRepositoryInMemory } from "../../../infra/repositories";

let instance: OfficerRepositoryInMemory | null = null;

export const makeOfficerRepository = (
  militaryRepository: MilitaryRepository,
): OfficerRepository => {
  if (!instance) {
    instance = new OfficerRepositoryInMemory(militaryRepository);
  }
  return instance;
};
