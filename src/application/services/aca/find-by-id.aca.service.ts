import { ACAOutputDTO } from "../../../domain/dtos";
import { ACARepository } from "../../../domain/repositories";
import { FindByIdACAUseCase } from "../../../domain/usecases";
import {
  ACAIdRegisteredValidatorProtocol,
  IdSanitizerProtocol,
  IdValidatorProtocol,
} from "../../protocols";
import { BaseFindByIdService, BaseFindByIdServiceDeps } from "../common";

interface FindByIdACAServiceProps {
  acaRepository: ACARepository;
  sanitizer: IdSanitizerProtocol;
  idValidator: IdValidatorProtocol;
  idRegisteredValidator: ACAIdRegisteredValidatorProtocol;
}

export class FindByIdACAService
  extends BaseFindByIdService<ACAOutputDTO>
  implements FindByIdACAUseCase
{
  constructor(props: FindByIdACAServiceProps) {
    const baseServiceDeps: BaseFindByIdServiceDeps<ACAOutputDTO> = {
      repository: props.acaRepository,
      idSanitizer: props.sanitizer,
      idValidator: props.idValidator,
      idRegisteredValidator: props.idRegisteredValidator,
    };
    super(baseServiceDeps);
  }
}
