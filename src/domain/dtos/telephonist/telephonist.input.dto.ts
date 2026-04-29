import { WorkPeriod, WorkSchedule } from "../../enums";

export type TelephonistInputDTO = {
  militaryId: string;
  workPeriod: WorkPeriod;
  workSchedule: WorkSchedule;
};
