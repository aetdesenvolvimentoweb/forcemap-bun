import { UserRole } from "../../../domain/entities";
import { OfficerRepository } from "../../../domain/repositories";
import { DeleteOfficerUseCase } from "../../../domain/usecases";
import {
  IdSanitizerProtocol,
  IdValidatorProtocol,
  OfficerIdRegisteredValidatorProtocol,
} from "../../protocols";
import { BaseDeleteService, BaseDeleteServiceDeps } from "../common";

interface DeleteOfficerServiceProps {
  officerRepository: OfficerRepository;
  sanitizer: IdSanitizerProtocol;
  idValidator: IdValidatorProtocol;
  idRegisteredValidator: OfficerIdRegisteredValidatorProtocol;
}

export class DeleteOfficerService
  extends BaseDeleteService
  implements DeleteOfficerUseCase
{
  constructor(props: DeleteOfficerServiceProps) {
    const baseServiceDeps: BaseDeleteServiceDeps = {
      repository: props.officerRepository,
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
