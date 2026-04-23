import { VehicleRepository } from "../../../domain/repositories";
import { DeleteVehicleUseCase } from "../../../domain/usecases";
import {
  IdSanitizerProtocol,
  IdValidatorProtocol,
  VehicleIdRegisteredValidatorProtocol,
  VehicleInUseValidatorProtocol,
} from "../../protocols";
import { BaseDeleteService, BaseDeleteServiceDeps } from "../common";

interface DeleteVehicleServiceProps {
  vehicleRepository: VehicleRepository;
  sanitizer: IdSanitizerProtocol;
  idValidator: IdValidatorProtocol;
  idRegisteredValidator: VehicleIdRegisteredValidatorProtocol;
  inUseValidator: VehicleInUseValidatorProtocol;
}

export class DeleteVehicleService
  extends BaseDeleteService
  implements DeleteVehicleUseCase
{
  private readonly inUseValidator: VehicleInUseValidatorProtocol;

  constructor(props: DeleteVehicleServiceProps) {
    const baseServiceDeps: BaseDeleteServiceDeps = {
      repository: props.vehicleRepository,
      idSanitizer: props.sanitizer,
      idValidator: props.idValidator,
      idRegisteredValidator: props.idRegisteredValidator,
    };
    super(baseServiceDeps);
    this.inUseValidator = props.inUseValidator;
  }

  protected async performAdditionalValidations(id: string): Promise<void> {
    await this.inUseValidator.validate(id);
  }
}
