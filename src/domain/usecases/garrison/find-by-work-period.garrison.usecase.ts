import { Garrison, WorkPeriod } from "../../entities";

export interface FindByWorkPeriodGarrisonUseCase {
  findByWorkPeriod(workPeriod: WorkPeriod): Promise<Garrison | null>;
}
