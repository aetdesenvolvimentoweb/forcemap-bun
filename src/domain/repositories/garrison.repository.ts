import { GarrisonInputDTO, GarrisonOutputDTO } from "../dtos";

export interface GarrisonRepository {
  create(data: GarrisonInputDTO): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<GarrisonOutputDTO | null>;
  findByMilitaryId(militaryId: string): Promise<GarrisonOutputDTO | null>;
  listAll(): Promise<GarrisonOutputDTO[]>;
  update(id: string, data: GarrisonInputDTO): Promise<void>;
}
