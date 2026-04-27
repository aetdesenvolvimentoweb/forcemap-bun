import { OfficerInputDTO } from "../../../domain/dtos";
import { OfficerRepository } from "../../../domain/repositories";
import { CreateOfficerUseCase } from "../../../domain/usecases";
import {
  OfficerInputDTOSanitizerProtocol,
  OfficerInputDTOValidatorProtocol,
} from "../../protocols";
import { BaseCreateService, BaseCreateServiceDeps } from "../common";

interface CreateOfficerServiceProps {
  officerRepository: OfficerRepository;
  sanitizer: OfficerInputDTOSanitizerProtocol;
  validator: OfficerInputDTOValidatorProtocol;
}

export class CreateOfficerService
  extends BaseCreateService<OfficerInputDTO>
  implements CreateOfficerUseCase
{
  constructor(props: CreateOfficerServiceProps) {
    const baseServiceDeps: BaseCreateServiceDeps<OfficerInputDTO> = {
      repository: props.officerRepository,
      sanitizer: props.sanitizer,
      validator: props.validator,
    };
    super(baseServiceDeps);
  }
}
