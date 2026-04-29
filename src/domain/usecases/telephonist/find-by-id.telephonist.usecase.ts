import { TelephonistOutputDTO } from "../../dtos";

export interface FindByIdTelephonistUseCase {
  findById(id: string): Promise<TelephonistOutputDTO | null>;
}
