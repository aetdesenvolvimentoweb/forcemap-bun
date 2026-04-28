import { WorkPeriod, WorkSchedule } from "../enums";
import { Military } from "./military.entity";

export type MilitaryInGarrison = {
  militaryId: string;
  military?: Military;
  workPeriod: WorkPeriod;
  workSchedule: WorkSchedule;
};

export type Garrison = {
  id: string;
  vehicleId: string;
  militaryInGarrison: MilitaryInGarrison[];
};
