import { TelephonistInputDTO } from "../../dtos";

export interface UpdateTelephonistUseCase {
  update(id: string, data: TelephonistInputDTO): Promise<void>;
}
