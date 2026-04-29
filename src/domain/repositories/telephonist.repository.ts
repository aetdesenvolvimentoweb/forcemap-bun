import { TelephonistInputDTO, TelephonistOutputDTO } from "../dtos";

export interface TelephonistRepository {
  create(data: TelephonistInputDTO): Promise<void>;
  delete(id: string): Promise<void>;
  findByMilitaryId(militaryId: string): Promise<TelephonistOutputDTO | null>;
  findById(id: string): Promise<TelephonistOutputDTO | null>;
  listAll(): Promise<TelephonistOutputDTO[]>;
  update(id: string, data: TelephonistInputDTO): Promise<void>;
}
