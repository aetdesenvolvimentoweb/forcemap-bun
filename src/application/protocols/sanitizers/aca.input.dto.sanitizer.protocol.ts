import { ACAInputDTO } from "../../../domain/dtos";

export interface ACAInputDTOSanitizerProtocol {
  sanitize(data: ACAInputDTO): ACAInputDTO;
}
