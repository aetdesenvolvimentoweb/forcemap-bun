import { ACAInputDTO } from "../../dtos";

export interface CreateACAUseCase {
  create(data: ACAInputDTO): Promise<void>;
}
