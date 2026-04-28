import { UserRole } from "../../../domain/entities";
import { ACARepository } from "../../../domain/repositories";
import { DeleteACAUseCase } from "../../../domain/usecases";
import {
  ACAIdRegisteredValidatorProtocol,
  IdSanitizerProtocol,
  IdValidatorProtocol,
} from "../../protocols";
import { BaseDeleteService, BaseDeleteServiceDeps } from "../common";

interface DeleteACAServiceProps {
  acaRepository: ACARepository;
  sanitizer: IdSanitizerProtocol;
  idValidator: IdValidatorProtocol;
  idRegisteredValidator: ACAIdRegisteredValidatorProtocol;
}

export class DeleteACAService
  extends BaseDeleteService
  implements DeleteACAUseCase
{
  constructor(props: DeleteACAServiceProps) {
    const baseServiceDeps: BaseDeleteServiceDeps = {
      repository: props.acaRepository,
      idSanitizer: props.sanitizer,
      idValidator: props.idValidator,
      idRegisteredValidator: props.idRegisteredValidator,
    };
    super(baseServiceDeps);
  }

  public readonly delete = async (
    id: string,
    requestingUserRole?: UserRole,
  ): Promise<void> => {
    const sanitizedId = this.idSanitizer.sanitize(id);
    this.idValidator.validate(sanitizedId);
    await this.idRegisteredValidator.validate(sanitizedId);

    await this.performAdditionalValidations(sanitizedId);
    await this.repository.delete(sanitizedId);
  };
}
