import { GarrisonRepository } from "../../../domain/repositories";
import { DeleteGarrisonUseCase } from "../../../domain/usecases";
import {
  GarrisonIdRegisteredValidatorProtocol,
  IdSanitizerProtocol,
  IdValidatorProtocol,
} from "../../protocols";
import { BaseDeleteService, BaseDeleteServiceDeps } from "../common";

interface DeleteGarrisonServiceProps {
  garrisonRepository: GarrisonRepository;
  sanitizer: IdSanitizerProtocol;
  idValidator: IdValidatorProtocol;
  idRegisteredValidator: GarrisonIdRegisteredValidatorProtocol;
}

export class DeleteGarrisonService
  extends BaseDeleteService
  implements DeleteGarrisonUseCase
{
  constructor(props: DeleteGarrisonServiceProps) {
    const baseServiceDeps: BaseDeleteServiceDeps = {
      repository: props.garrisonRepository,
      idSanitizer: props.sanitizer,
      idValidator: props.idValidator,
      idRegisteredValidator: props.idRegisteredValidator,
    };
    super(baseServiceDeps);
  }

  public readonly delete = async (id: string): Promise<void> => {
    const sanitizedId = this.idSanitizer.sanitize(id);
    this.idValidator.validate(sanitizedId);
    await this.idRegisteredValidator.validate(sanitizedId);

    await this.performAdditionalValidations(sanitizedId);
    await this.repository.delete(sanitizedId);
  };
}
