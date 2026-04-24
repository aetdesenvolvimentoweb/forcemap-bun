import { Garrison } from "../../entities";

export interface ListAllGarrisonUseCase {
  listAll(): Promise<Garrison[]>;
}
