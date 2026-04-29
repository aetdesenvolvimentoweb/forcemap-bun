import { TelephonistOutputDTO } from "../../../domain/dtos";
import { TelephonistRepository } from "../../../domain/repositories";
import { FindByIdTelephonistUseCase } from "../../../domain/usecases";
import {
  IdSanitizerProtocol,
  IdValidatorProtocol,
  TelephonistIdRegisteredValidatorProtocol,
} from "../../protocols";
import { BaseFindByIdService, BaseFindByIdServiceDeps } from "../common";

interface FindByIdTelephonistServiceProps {
  telephonistRepository: TelephonistRepository;
  sanitizer: IdSanitizerProtocol;
  idValidator: IdValidatorProtocol;
  idRegisteredValidator: TelephonistIdRegisteredValidatorProtocol;
}

export class FindByIdTelephonistService
  extends BaseFindByIdService<TelephonistOutputDTO>
  implements FindByIdTelephonistUseCase
{
  constructor(props: FindByIdTelephonistServiceProps) {
    const baseServiceDeps: BaseFindByIdServiceDeps<TelephonistOutputDTO> = {
      repository: props.telephonistRepository,
      idSanitizer: props.sanitizer,
      idValidator: props.idValidator,
      idRegisteredValidator: props.idRegisteredValidator,
    };
    super(baseServiceDeps);
  }
}
