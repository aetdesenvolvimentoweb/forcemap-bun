import { OfficerInputDTO, OfficerOutputDTO } from "../dtos";
import { WorkPeriod } from "../enums";

export interface OfficerRepository {
  create(data: OfficerInputDTO): Promise<void>;
  delete(id: string): Promise<void>;
  findByMilitaryId(militaryId: string): Promise<OfficerOutputDTO | null>;
  findById(id: string): Promise<OfficerOutputDTO | null>;
  findByWorkPeriod(workPerio: WorkPeriod): Promise<OfficerOutputDTO | null>;
  listAll(): Promise<OfficerOutputDTO[]>;
  update(id: string, data: OfficerInputDTO): Promise<void>;
}
