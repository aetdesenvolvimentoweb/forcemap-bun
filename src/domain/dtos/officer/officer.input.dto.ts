import { WorkPeriod, WorkSchedule } from "../../enums";

export type OfficerInputDTO = {
  militaryId: string;
  workPeriod: WorkPeriod;
  workSchedule: WorkSchedule;
};
