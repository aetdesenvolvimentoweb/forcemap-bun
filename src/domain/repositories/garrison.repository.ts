import { GarrisonInputDTO, GarrisonOutputDTO } from "../dtos";
import { WorkPeriod } from "../enums";

export interface GarrisonRepository {
  create(data: GarrisonInputDTO): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<GarrisonOutputDTO | null>;
  findByMilitaryId(militaryId: string): Promise<GarrisonOutputDTO | null>;
  findByWorkPeriod(workPeriod: WorkPeriod): Promise<GarrisonOutputDTO | null>;
  listAll(): Promise<GarrisonOutputDTO[]>;
  update(id: string, data: GarrisonInputDTO): Promise<void>;
}
