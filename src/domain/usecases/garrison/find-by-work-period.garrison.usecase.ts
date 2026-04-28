import { GarrisonOutputDTO } from "../../dtos";
import { WorkPeriod } from "../../enums";

export interface FindByWorkPeriodGarrisonUseCase {
  findByWorkPeriod(workPeriod: WorkPeriod): Promise<GarrisonOutputDTO | null>;
}
