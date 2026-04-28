import { GarrisonOutputDTO } from "../../../domain/dtos";
import { GarrisonRepository } from "../../../domain/repositories";
import { FindByIdGarrisonUseCase } from "../../../domain/usecases";
import {
  GarrisonIdRegisteredValidatorProtocol,
  IdSanitizerProtocol,
  IdValidatorProtocol,
} from "../../protocols";
import { BaseFindByIdService, BaseFindByIdServiceDeps } from "../common";

interface FindByIdGarrisonServiceProps {
  garrisonRepository: GarrisonRepository;
  sanitizer: IdSanitizerProtocol;
  idValidator: IdValidatorProtocol;
  idRegisteredValidator: GarrisonIdRegisteredValidatorProtocol;
}

export class FindByIdGarrisonService
  extends BaseFindByIdService<GarrisonOutputDTO>
  implements FindByIdGarrisonUseCase
{
  constructor(props: FindByIdGarrisonServiceProps) {
    const baseServiceDeps: BaseFindByIdServiceDeps<GarrisonOutputDTO> = {
      repository: props.garrisonRepository,
      idSanitizer: props.sanitizer,
      idValidator: props.idValidator,
      idRegisteredValidator: props.idRegisteredValidator,
    };
    super(baseServiceDeps);
  }
}
