import { OfficerOutputDTO } from "../../dtos";

export interface ListAllOfficerUseCase {
  listAll(): Promise<OfficerOutputDTO[]>;
}
