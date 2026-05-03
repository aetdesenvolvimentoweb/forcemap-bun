import { Military, Vehicle } from "../../entities";
import { WorkPeriod, WorkSchedule } from "../../enums";

export type MilitaryInGarrisonOutputDTO = {
  military: Military;
  workPeriod: WorkPeriod;
  workSchedule: WorkSchedule;
};

export type GarrisonOutputDTO = {
  id: string;
  vehicle: Vehicle;
  militaryInGarrison: MilitaryInGarrisonOutputDTO[];
};
