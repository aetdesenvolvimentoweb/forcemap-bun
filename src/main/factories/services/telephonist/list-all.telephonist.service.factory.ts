import { ListAllTelephonistService } from "../../../../application/services";
import { GenericServiceFactory } from "../../common";
import {
  makeMilitaryRankRepository,
  makeMilitaryRepository,
  makeTelephonistRepository,
} from "../../repositories";

export const makeListAllTelephonistService = (): ListAllTelephonistService => {
  const militaryRankRepository = makeMilitaryRankRepository();
  const militaryRepository = makeMilitaryRepository(militaryRankRepository);
  const telephonistRepository = makeTelephonistRepository(militaryRepository);

  return GenericServiceFactory.listAllService({
    ServiceClass: ListAllTelephonistService,
    repositoryMaker: () => telephonistRepository,
    repositoryKey: "telephonistRepository",
  });
};
