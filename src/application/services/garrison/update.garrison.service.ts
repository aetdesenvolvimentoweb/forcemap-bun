import { GarrisonInputDTO } from "../../../domain/dtos";
import { GarrisonRepository } from "../../../domain/repositories";
import { UpdateGarrisonUseCase } from "../../../domain/usecases";
import {
  GarrisonIdRegisteredValidatorProtocol,
  GarrisonInputDTOSanitizerProtocol,
  GarrisonInputDTOValidatorProtocol,
  IdSanitizerProtocol,
  IdValidatorProtocol,
} from "../../protocols";
import { BaseUpdateService, BaseUpdateServiceDeps } from "../common";

interface UpdateGarrisonServiceProps {
  garrisonRepository: GarrisonRepository;
  idSanitizer: IdSanitizerProtocol;
  dataSanitizer: GarrisonInputDTOSanitizerProtocol;
  idValidator: IdValidatorProtocol;
  idRegisteredValidator: GarrisonIdRegisteredValidatorProtocol;
  dataValidator: GarrisonInputDTOValidatorProtocol;
}

export class UpdateGarrisonService
  extends BaseUpdateService<GarrisonInputDTO>
  implements UpdateGarrisonUseCase
{
  constructor(props: UpdateGarrisonServiceProps) {
    const baseServiceDeps: BaseUpdateServiceDeps<GarrisonInputDTO> = {
      repository: props.garrisonRepository,
      idSanitizer: props.idSanitizer,
      dataSanitizer: props.dataSanitizer,
      idValidator: props.idValidator,
      idRegisteredValidator: props.idRegisteredValidator,
      dataValidator: props.dataValidator,
    };
    super(baseServiceDeps);
  }
}
