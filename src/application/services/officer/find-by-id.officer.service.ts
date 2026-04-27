import { OfficerOutputDTO } from "../../../domain/dtos";
import { OfficerRepository } from "../../../domain/repositories";
import { FindByIdOfficerUseCase } from "../../../domain/usecases";
import {
  IdSanitizerProtocol,
  IdValidatorProtocol,
  OfficerIdRegisteredValidatorProtocol,
} from "../../protocols";
import { BaseFindByIdService, BaseFindByIdServiceDeps } from "../common";

interface FindByIdOfficerServiceProps {
  officerRepository: OfficerRepository;
  sanitizer: IdSanitizerProtocol;
  idValidator: IdValidatorProtocol;
  idRegisteredValidator: OfficerIdRegisteredValidatorProtocol;
}

export class FindByIdOfficerService
  extends BaseFindByIdService<OfficerOutputDTO>
  implements FindByIdOfficerUseCase
{
  constructor(props: FindByIdOfficerServiceProps) {
    const baseServiceDeps: BaseFindByIdServiceDeps<OfficerOutputDTO> = {
      repository: props.officerRepository,
      idSanitizer: props.sanitizer,
      idValidator: props.idValidator,
      idRegisteredValidator: props.idRegisteredValidator,
    };
    super(baseServiceDeps);
  }
}
