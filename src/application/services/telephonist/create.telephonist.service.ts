import { TelephonistInputDTO } from "../../../domain/dtos";
import { TelephonistRepository } from "../../../domain/repositories";
import { CreateTelephonistUseCase } from "../../../domain/usecases";
import {
  TelephonistInputDTOSanitizerProtocol,
  TelephonistInputDTOValidatorProtocol,
} from "../../protocols";
import { BaseCreateService, BaseCreateServiceDeps } from "../common";

interface CreateTelephonistServiceProps {
  telephonistRepository: TelephonistRepository;
  sanitizer: TelephonistInputDTOSanitizerProtocol;
  validator: TelephonistInputDTOValidatorProtocol;
}

export class CreateTelephonistService
  extends BaseCreateService<TelephonistInputDTO>
  implements CreateTelephonistUseCase
{
  constructor(props: CreateTelephonistServiceProps) {
    const baseServiceDeps: BaseCreateServiceDeps<TelephonistInputDTO> = {
      repository: props.telephonistRepository,
      sanitizer: props.sanitizer,
      validator: props.validator,
    };
    super(baseServiceDeps);
  }
}
