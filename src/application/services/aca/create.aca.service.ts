import { ACAInputDTO } from "../../../domain/dtos";
import { ACARepository } from "../../../domain/repositories";
import { CreateACAUseCase } from "../../../domain/usecases";
import {
  ACAInputDTOSanitizerProtocol,
  ACAInputDTOValidatorProtocol,
} from "../../protocols";
import { BaseCreateService, BaseCreateServiceDeps } from "../common";

interface CreateACAServiceProps {
  acaRepository: ACARepository;
  sanitizer: ACAInputDTOSanitizerProtocol;
  validator: ACAInputDTOValidatorProtocol;
}

export class CreateACAService
  extends BaseCreateService<ACAInputDTO>
  implements CreateACAUseCase
{
  constructor(props: CreateACAServiceProps) {
    const baseServiceDeps: BaseCreateServiceDeps<ACAInputDTO> = {
      repository: props.acaRepository,
      sanitizer: props.sanitizer,
      validator: props.validator,
    };
    super(baseServiceDeps);
  }
}
