import { ACAInputDTO, ACAOutputDTO } from "../dtos";

export interface ACARepository {
  create(data: ACAInputDTO): Promise<void>;
  delete(id: string): Promise<void>;
  findByMilitaryId(militaryId: string): Promise<ACAOutputDTO | null>;
  findById(id: string): Promise<ACAOutputDTO | null>;
  listAll(): Promise<ACAOutputDTO[]>;
  update(id: string, data: ACAInputDTO): Promise<void>;
}
