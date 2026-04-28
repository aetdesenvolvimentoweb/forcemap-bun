import { GarrisonInputDTO } from "../../../domain/dtos";
import { GarrisonRepository } from "../../../domain/repositories";
import { CreateGarrisonUseCase } from "../../../domain/usecases";
import {
  GarrisonInputDTOSanitizerProtocol,
  GarrisonInputDTOValidatorProtocol,
} from "../../protocols";
import { BaseCreateService, BaseCreateServiceDeps } from "../common";

interface CreateGarrisonServiceProps {
  garrisonRepository: GarrisonRepository;
  sanitizer: GarrisonInputDTOSanitizerProtocol;
  validator: GarrisonInputDTOValidatorProtocol;
}

export class CreateGarrisonService
  extends BaseCreateService<GarrisonInputDTO>
  implements CreateGarrisonUseCase
{
  constructor(props: CreateGarrisonServiceProps) {
    const baseServiceDeps: BaseCreateServiceDeps<GarrisonInputDTO> = {
      repository: props.garrisonRepository,
      sanitizer: props.sanitizer,
      validator: props.validator,
    };
    super(baseServiceDeps);
  }
}
