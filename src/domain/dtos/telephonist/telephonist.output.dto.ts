import { Military } from "../../entities";
import { WorkPeriod, WorkSchedule } from "../../enums";

export type TelephonistOutputDTO = {
  id: string;
  military: Military;
  workPeriod: WorkPeriod;
  workSchedule: WorkSchedule;
};
