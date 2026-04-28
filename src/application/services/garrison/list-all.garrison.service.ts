import { GarrisonOutputDTO } from "../../../domain/dtos";
import { GarrisonRepository } from "../../../domain/repositories";
import { ListAllGarrisonUseCase } from "../../../domain/usecases";
import { BaseListAllService, BaseListAllServiceDeps } from "../common";

interface ListAllGarrisonServiceProps {
  garrisonRepository: GarrisonRepository;
}

export class ListAllGarrisonService
  extends BaseListAllService<GarrisonOutputDTO>
  implements ListAllGarrisonUseCase
{
  constructor(props: ListAllGarrisonServiceProps) {
    const baseServiceDeps: BaseListAllServiceDeps<GarrisonOutputDTO> = {
      repository: props.garrisonRepository,
    };
    super(baseServiceDeps);
  }
}
