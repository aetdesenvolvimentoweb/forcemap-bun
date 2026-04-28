import { Military } from "../../entities";
import { WorkPeriod, WorkSchedule } from "../../enums";

export type MilitaryInGarrisonOutputDTO = {
  military: Military;
  workPeriod: WorkPeriod;
  workSchedule: WorkSchedule;
};

export type GarrisonOutputDTO = {
  vehicleId: string;
  militaryInGarrison: MilitaryInGarrisonOutputDTO[];
};
