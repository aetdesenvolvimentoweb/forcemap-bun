import { Garrison } from "../../entities";

export interface FindByMilitaryIdGarrisonUseCase {
  findByMilitaryId(militaryId: string): Promise<Garrison | null>;
}
