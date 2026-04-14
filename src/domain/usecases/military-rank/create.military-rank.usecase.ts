import { MilitaryRankInputDTO } from "../../dtos";

export interface CreateMilitaryRankUseCase {
  create(data: MilitaryRankInputDTO): Promise<void>;
}
