import { ListAllOfficerService } from "../../../../application/services";
import { GenericServiceFactory } from "../../common";
import {
  makeMilitaryRankRepository,
  makeMilitaryRepository,
  makeOfficerRepository,
} from "../../repositories";

export const makeListAllOfficerService = (): ListAllOfficerService => {
  const militaryRankRepository = makeMilitaryRankRepository();
  const militaryRepository = makeMilitaryRepository(militaryRankRepository);
  const officerRepository = makeOfficerRepository(militaryRepository);

  return GenericServiceFactory.listAllService({
    ServiceClass: ListAllOfficerService,
    repositoryMaker: () => officerRepository,
    repositoryKey: "officerRepository",
  });
};
