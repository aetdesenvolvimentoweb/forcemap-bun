import { GarrisonInputDTO } from "../dtos";
import { Garrison, WorkPeriod } from "../entities";

export interface GarrisonRepository {
  create(data: GarrisonInputDTO): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Garrison | null>;
  findByMilitaryId(militaryId: string): Promise<Garrison | null>;
  findByWorkPeriod(workPeriod: WorkPeriod): Promise<Garrison | null>;
  listAll(): Promise<Garrison[]>;
  update(id: string, data: GarrisonInputDTO): Promise<void>;
}
