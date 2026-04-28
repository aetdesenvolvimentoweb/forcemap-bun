import { GarrisonOutputDTO } from "../../dtos";

export interface ListAllGarrisonUseCase {
  listAll(): Promise<GarrisonOutputDTO[]>;
}
