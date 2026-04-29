import { TelephonistInputDTO } from "../../dtos";

export interface CreateTelephonistUseCase {
  create(data: TelephonistInputDTO): Promise<void>;
}
