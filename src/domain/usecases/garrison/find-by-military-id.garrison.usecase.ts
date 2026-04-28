import { GarrisonOutputDTO } from "../../dtos";

export interface FindByMilitaryIdGarrisonUseCase {
  findByMilitaryId(militaryId: string): Promise<GarrisonOutputDTO | null>;
}
