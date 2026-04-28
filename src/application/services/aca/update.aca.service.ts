import { ACAInputDTO } from "../../../domain/dtos";
import { ACARepository } from "../../../domain/repositories";
import { UpdateACAUseCase } from "../../../domain/usecases";
import {
  ACAIdRegisteredValidatorProtocol,
  ACAInputDTOSanitizerProtocol,
  ACAInputDTOValidatorProtocol,
  IdSanitizerProtocol,
  IdValidatorProtocol,
} from "../../protocols";
import { BaseUpdateService, BaseUpdateServiceDeps } from "../common";

interface UpdateACAServiceProps {
  acaRepository: ACARepository;
  idSanitizer: IdSanitizerProtocol;
  dataSanitizer: ACAInputDTOSanitizerProtocol;
  idValidator: IdValidatorProtocol;
  idRegisteredValidator: ACAIdRegisteredValidatorProtocol;
  dataValidator: ACAInputDTOValidatorProtocol;
}

export class UpdateACAService
  extends BaseUpdateService<ACAInputDTO>
  implements UpdateACAUseCase
{
  constructor(props: UpdateACAServiceProps) {
    const baseServiceDeps: BaseUpdateServiceDeps<ACAInputDTO> = {
      repository: props.acaRepository,
      idSanitizer: props.idSanitizer,
      dataSanitizer: props.dataSanitizer,
      idValidator: props.idValidator,
      idRegisteredValidator: props.idRegisteredValidator,
      dataValidator: props.dataValidator,
    };
    super(baseServiceDeps);
  }
}
