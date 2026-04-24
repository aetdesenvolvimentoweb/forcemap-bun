import { Garrison } from "../../entities";

export interface FindByMilitaryIdUseCase {
  findByMilitaryId(militaryId: string): Promise<Garrison | null>;
}
