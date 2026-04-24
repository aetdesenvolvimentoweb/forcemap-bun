import { GarrisonInputDTO } from "../../dtos";

export interface UpdateGarrisonUseCase {
  update(id: string, data: GarrisonInputDTO): Promise<void>;
}
