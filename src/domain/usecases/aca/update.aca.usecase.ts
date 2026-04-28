import { ACAInputDTO } from "../../dtos";

export interface UpdateACAUseCase {
  update(id: string, data: ACAInputDTO): Promise<void>;
}
