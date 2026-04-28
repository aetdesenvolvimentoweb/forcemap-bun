import { ACAOutputDTO } from "../../../domain/dtos";
import { ACARepository } from "../../../domain/repositories";
import { ListAllACAUseCase } from "../../../domain/usecases";
import { BaseListAllService, BaseListAllServiceDeps } from "../common";

interface ListAllACAServiceProps {
  acaRepository: ACARepository;
}

export class ListAllACAService
  extends BaseListAllService<ACAOutputDTO>
  implements ListAllACAUseCase
{
  constructor(props: ListAllACAServiceProps) {
    const baseServiceDeps: BaseListAllServiceDeps<ACAOutputDTO> = {
      repository: props.acaRepository,
    };
    super(baseServiceDeps);
  }
}
