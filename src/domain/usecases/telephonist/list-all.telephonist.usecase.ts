import { TelephonistOutputDTO } from "../../dtos";

export interface ListAllTelephonistUseCase {
  listAll(): Promise<TelephonistOutputDTO[]>;
}
