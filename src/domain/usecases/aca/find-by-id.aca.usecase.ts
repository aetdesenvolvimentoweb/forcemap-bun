import { ACAOutputDTO } from "../../dtos";

export interface FindByIdACAUseCase {
  findById(id: string): Promise<ACAOutputDTO | null>;
}
