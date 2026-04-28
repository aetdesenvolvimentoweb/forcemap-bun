import { WorkPeriod, WorkSchedule } from "../enums";
import { Military } from "./military.entity";

export type ACA = {
  id: string;
  militaryId: string;
  military?: Military;
  workPeriod: WorkPeriod;
  workSchedule: WorkSchedule;
};
