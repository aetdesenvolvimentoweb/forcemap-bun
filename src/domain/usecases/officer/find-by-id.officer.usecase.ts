import { OfficerOutputDTO } from "../../dtos";

export interface FindByIdOfficerUseCase {
  findById(id: string): Promise<OfficerOutputDTO | null>;
}
