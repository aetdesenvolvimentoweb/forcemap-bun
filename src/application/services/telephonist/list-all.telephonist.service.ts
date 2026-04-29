import { TelephonistOutputDTO } from "../../../domain/dtos";
import { TelephonistRepository } from "../../../domain/repositories";
import { ListAllTelephonistUseCase } from "../../../domain/usecases";
import { BaseListAllService, BaseListAllServiceDeps } from "../common";

interface ListAllTelephonistServiceProps {
  telephonistRepository: TelephonistRepository;
}

export class ListAllTelephonistService
  extends BaseListAllService<TelephonistOutputDTO>
  implements ListAllTelephonistUseCase
{
  constructor(props: ListAllTelephonistServiceProps) {
    const baseServiceDeps: BaseListAllServiceDeps<TelephonistOutputDTO> = {
      repository: props.telephonistRepository,
    };
    super(baseServiceDeps);
  }
}
