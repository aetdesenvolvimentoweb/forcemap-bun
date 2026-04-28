import { ListAllACAService } from "../../../../application/services";
import { GenericServiceFactory } from "../../common";
import {
  makeACARepository,
  makeMilitaryRankRepository,
  makeMilitaryRepository,
} from "../../repositories";

export const makeListAllACAService = (): ListAllACAService => {
  const militaryRankRepository = makeMilitaryRankRepository();
  const militaryRepository = makeMilitaryRepository(militaryRankRepository);
  const acaRepository = makeACARepository(militaryRepository);

  return GenericServiceFactory.listAllService({
    ServiceClass: ListAllACAService,
    repositoryMaker: () => acaRepository,
    repositoryKey: "acaRepository",
  });
};
