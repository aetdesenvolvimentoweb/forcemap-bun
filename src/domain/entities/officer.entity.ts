import { WorkPeriod, WorkSchedule } from "../enums";
import { Military } from "./military.entity";

export type Officer = {
  id: string;
  militaryId: string;
  military?: Military;
  workPeriod: WorkPeriod;
  workSchedule: WorkSchedule;
};
