import { OfficerInputDTO } from "../../../../domain/dtos";

export interface OfficerInputDTOValidatorProtocol {
  validate(data: OfficerInputDTO, idToIgnore?: string): Promise<void>;
}
