import { SessionRepository } from "../../../domain/repositories";
import { SessionRepositoryInMemory } from "../../../infra/repositories";

let sessionRepositoryInstance: SessionRepository | null = null;

export const makeSessionRepository = (): SessionRepository => {
  if (!sessionRepositoryInstance) {
    sessionRepositoryInstance = new SessionRepositoryInMemory();
  }
  return sessionRepositoryInstance;
};
