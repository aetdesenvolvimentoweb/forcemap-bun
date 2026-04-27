import { OfficerInputDTO } from "../../../domain/dtos";

export interface OfficerInputDTOSanitizerProtocol {
  sanitize(data: OfficerInputDTO): OfficerInputDTO;
}
