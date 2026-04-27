import { OfficerInputDTO } from "../../../domain/dtos";
import { OfficerRepository } from "../../../domain/repositories";
import { UpdateOfficerUseCase } from "../../../domain/usecases";
import {
  IdSanitizerProtocol,
  IdValidatorProtocol,
  OfficerIdRegisteredValidatorProtocol,
  OfficerInputDTOSanitizerProtocol,
  OfficerInputDTOValidatorProtocol,
} from "../../protocols";
import { BaseUpdateService, BaseUpdateServiceDeps } from "../common";

interface UpdateOfficerServiceProps {
  officerRepository: OfficerRepository;
  idSanitizer: IdSanitizerProtocol;
  dataSanitizer: OfficerInputDTOSanitizerProtocol;
  idValidator: IdValidatorProtocol;
  idRegisteredValidator: OfficerIdRegisteredValidatorProtocol;
  dataValidator: OfficerInputDTOValidatorProtocol;
}

export class UpdateOfficerService
  extends BaseUpdateService<OfficerInputDTO>
  implements UpdateOfficerUseCase
{
  constructor(props: UpdateOfficerServiceProps) {
    const baseServiceDeps: BaseUpdateServiceDeps<OfficerInputDTO> = {
      repository: props.officerRepository,
      idSanitizer: props.idSanitizer,
      dataSanitizer: props.dataSanitizer,
      idValidator: props.idValidator,
      idRegisteredValidator: props.idRegisteredValidator,
      dataValidator: props.dataValidator,
    };
    super(baseServiceDeps);
  }
}
