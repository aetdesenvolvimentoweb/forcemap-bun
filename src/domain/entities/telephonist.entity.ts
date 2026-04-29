import { WorkPeriod, WorkSchedule } from "../enums";
import { Military } from "./military.entity";

export type Telephonist = {
  id: string;
  militaryId: string;
  military?: Military;
  workPeriod: WorkPeriod;
  workSchedule: WorkSchedule;
};
