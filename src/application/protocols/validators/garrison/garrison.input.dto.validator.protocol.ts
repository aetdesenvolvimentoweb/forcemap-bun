import { GarrisonInputDTO } from "../../../../domain/dtos";

export interface GarrisonInputDTOValidatorProtocol {
  validate(data: GarrisonInputDTO, idToIgnore?: string): Promise<void>;
}
