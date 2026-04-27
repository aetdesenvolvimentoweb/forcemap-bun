import { OfficerInputDTO } from "../../dtos";

export interface UpdateOfficerUseCase {
  update(id: string, data: OfficerInputDTO): Promise<void>;
}
