import { WorkPeriod, WorkSchedule } from "../../enums";

export type MilitaryInGarrisonInputDTO = {
  militaryId: string;
  workPeriod: WorkPeriod;
  workSchedule: WorkSchedule;
};

export type GarrisonInputDTO = {
  vehicleId: string;
  militaryInGarrison: MilitaryInGarrisonInputDTO[];
};
