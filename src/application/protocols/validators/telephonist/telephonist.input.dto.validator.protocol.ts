import { TelephonistInputDTO } from "../../../../domain/dtos";

export interface TelephonistInputDTOValidatorProtocol {
  validate(data: TelephonistInputDTO, idToIgnore?: string): Promise<void>;
}
