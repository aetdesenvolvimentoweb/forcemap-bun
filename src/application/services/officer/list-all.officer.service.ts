import { OfficerOutputDTO } from "../../../domain/dtos";
import { OfficerRepository } from "../../../domain/repositories";
import { ListAllOfficerUseCase } from "../../../domain/usecases";
import { BaseListAllService, BaseListAllServiceDeps } from "../common";

interface ListAllOfficerServiceProps {
  officerRepository: OfficerRepository;
}

export class ListAllOfficerService
  extends BaseListAllService<OfficerOutputDTO>
  implements ListAllOfficerUseCase
{
  constructor(props: ListAllOfficerServiceProps) {
    const baseServiceDeps: BaseListAllServiceDeps<OfficerOutputDTO> = {
      repository: props.officerRepository,
    };
    super(baseServiceDeps);
  }
}
