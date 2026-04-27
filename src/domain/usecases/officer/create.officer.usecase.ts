import { OfficerInputDTO } from "../../dtos";

export interface CreateOfficerUseCase {
  create(data: OfficerInputDTO): Promise<void>;
}
