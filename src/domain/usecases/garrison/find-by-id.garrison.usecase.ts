import { GarrisonOutputDTO } from "../../dtos";

export interface FindByIdGarrisonUseCase {
  findById(id: string): Promise<GarrisonOutputDTO | null>;
}
