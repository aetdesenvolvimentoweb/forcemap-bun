import { ACAOutputDTO } from "../../dtos";

export interface ListAllACAUseCase {
  listAll(): Promise<ACAOutputDTO[]>;
}
