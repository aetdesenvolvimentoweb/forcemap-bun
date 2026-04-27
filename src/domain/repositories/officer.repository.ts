import { OfficerInputDTO, OfficerOutputDTO } from "../dtos";

export interface OfficerRepository {
  create(data: OfficerInputDTO): Promise<void>;
  delete(id: string): Promise<void>;
  findByMilitaryId(militaryId: string): Promise<OfficerOutputDTO | null>;
  findById(id: string): Promise<OfficerOutputDTO | null>;
  findByPeriod(order: number): Promise<OfficerOutputDTO | null>;
  listAll(): Promise<OfficerOutputDTO[]>;
  update(id: string, data: OfficerInputDTO): Promise<void>;
}
