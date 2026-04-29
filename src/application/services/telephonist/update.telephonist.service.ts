import { TelephonistInputDTO } from "../../../domain/dtos";
import { TelephonistRepository } from "../../../domain/repositories";
import { UpdateTelephonistUseCase } from "../../../domain/usecases";
import {
  IdSanitizerProtocol,
  IdValidatorProtocol,
  TelephonistIdRegisteredValidatorProtocol,
  TelephonistInputDTOSanitizerProtocol,
  TelephonistInputDTOValidatorProtocol,
} from "../../protocols";
import { BaseUpdateService, BaseUpdateServiceDeps } from "../common";

interface UpdateTelephonistServiceProps {
  telephonistRepository: TelephonistRepository;
  idSanitizer: IdSanitizerProtocol;
  dataSanitizer: TelephonistInputDTOSanitizerProtocol;
  idValidator: IdValidatorProtocol;
  idRegisteredValidator: TelephonistIdRegisteredValidatorProtocol;
  dataValidator: TelephonistInputDTOValidatorProtocol;
}

export class UpdateTelephonistService
  extends BaseUpdateService<TelephonistInputDTO>
  implements UpdateTelephonistUseCase
{
  constructor(props: UpdateTelephonistServiceProps) {
    const baseServiceDeps: BaseUpdateServiceDeps<TelephonistInputDTO> = {
      repository: props.telephonistRepository,
      idSanitizer: props.idSanitizer,
      dataSanitizer: props.dataSanitizer,
      idValidator: props.idValidator,
      idRegisteredValidator: props.idRegisteredValidator,
      dataValidator: props.dataValidator,
    };
    super(baseServiceDeps);
  }
}
