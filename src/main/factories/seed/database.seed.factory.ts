import { DatabaseSeed } from "../../seed";
import { makePasswordHasher } from "../hasher";
import { makeGlobalLogger } from "../logger";
import {
  makeMilitaryRankRepository,
  makeMilitaryRepository,
  makeUserRepository,
} from "../repositories";

export const makeDatabaseSeed = (): DatabaseSeed => {
  const militaryRankRepository = makeMilitaryRankRepository();
  const militaryRepository = makeMilitaryRepository(militaryRankRepository);
  const userRepository = makeUserRepository(militaryRepository);
  const passwordHasher = makePasswordHasher();
  const logger = makeGlobalLogger();

  return new DatabaseSeed(
    militaryRankRepository,
    militaryRepository,
    userRepository,
    passwordHasher,
    logger,
  );
};
