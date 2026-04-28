import { ACAInputDTO } from "../../../../domain/dtos";

export interface ACAInputDTOValidatorProtocol {
  validate(data: ACAInputDTO, idToIgnore?: string): Promise<void>;
}
