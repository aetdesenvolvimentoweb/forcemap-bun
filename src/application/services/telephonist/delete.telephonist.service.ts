import { TelephonistRepository } from "../../../domain/repositories";
import { DeleteTelephonistUseCase } from "../../../domain/usecases";
import {
  IdSanitizerProtocol,
  IdValidatorProtocol,
  TelephonistIdRegisteredValidatorProtocol,
} from "../../protocols";
import { BaseDeleteService, BaseDeleteServiceDeps } from "../common";

interface DeleteTelephonistServiceProps {
  telephonistRepository: TelephonistRepository;
  sanitizer: IdSanitizerProtocol;
  idValidator: IdValidatorProtocol;
  idRegisteredValidator: TelephonistIdRegisteredValidatorProtocol;
}

export class DeleteTelephonistService
  extends BaseDeleteService
  implements DeleteTelephonistUseCase
{
  constructor(props: DeleteTelephonistServiceProps) {
    const baseServiceDeps: BaseDeleteServiceDeps = {
      repository: props.telephonistRepository,
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
