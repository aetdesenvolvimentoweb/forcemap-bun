import { Garrison } from "../../entities";

export interface FindByIdGarrisonUseCase {
  findById(id: string): Promise<Garrison | null>;
}
