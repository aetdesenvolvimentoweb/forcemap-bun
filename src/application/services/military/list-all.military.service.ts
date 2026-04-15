import { MilitaryOutputDTO } from "../../../domain/dtos";
import { MilitaryRepository } from "../../../domain/repositories";
import { ListAllMilitaryUseCase } from "../../../domain/usecases";
import { BaseListAllService, BaseListAllServiceDeps } from "../common";

interface ListAllMilitaryServiceProps {
  militaryRepository: MilitaryRepository;
}

export class ListAllMilitaryService
  extends BaseListAllService<MilitaryOutputDTO>
  implements ListAllMilitaryUseCase
{
  constructor(props: ListAllMilitaryServiceProps) {
    const baseServiceDeps: BaseListAllServiceDeps<MilitaryOutputDTO> = {
      repository: props.militaryRepository,
    };
    super(baseServiceDeps);
  }
}
