import { GarrisonInputDTO } from "../../../domain/dtos";

export interface GarrisonInputDTOSanitizerProtocol {
  sanitize(data: GarrisonInputDTO): GarrisonInputDTO;
}
