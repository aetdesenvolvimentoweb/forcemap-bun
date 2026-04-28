import { WorkPeriod, WorkSchedule } from "../../enums";

export type ACAInputDTO = {
  militaryId: string;
  workPeriod: WorkPeriod;
  workSchedule: WorkSchedule;
};
