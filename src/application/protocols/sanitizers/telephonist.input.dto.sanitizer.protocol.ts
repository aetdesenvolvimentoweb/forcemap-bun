import { TelephonistInputDTO } from "../../../domain/dtos";

export interface TelephonistInputDTOSanitizerProtocol {
  sanitize(data: TelephonistInputDTO): TelephonistInputDTO;
}
