import { ListAllGarrisonService } from "../../../../application/services";
import { GenericServiceFactory } from "../../common";
import {
  makeGarrisonRepository,
  makeMilitaryRankRepository,
  makeMilitaryRepository,
} from "../../repositories";

export const makeListAllGarrisonService = (): ListAllGarrisonService => {
  const militaryRankRepository = makeMilitaryRankRepository();
  const militaryRepository = makeMilitaryRepository(militaryRankRepository);
  const garrisonRepository = makeGarrisonRepository(militaryRepository);

  return GenericServiceFactory.listAllService({
    ServiceClass: ListAllGarrisonService,
    repositoryMaker: () => garrisonRepository,
    repositoryKey: "garrisonRepository",
  });
};
