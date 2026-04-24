import { GarrisonInputDTO } from "../../dtos";

export interface CreateGarrisonUseCase {
  create(data: GarrisonInputDTO): Promise<void>;
}
