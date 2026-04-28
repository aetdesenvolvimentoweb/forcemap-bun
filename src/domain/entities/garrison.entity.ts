import { WorkPeriod, WorkSchedule } from "../enums";
import { Military } from "./military.entity";
import { Vehicle } from "./vehicle.entity";

export type MilitaryInGarrison = {
  militaryId: string;
  military?: Military;
  workPeriod: WorkPeriod;
  workSchedule: WorkSchedule;
};

export type Garrison = {
  id: string;
  vehicleId: string;
  vehicle?: Vehicle;
  militaryInGarrison: MilitaryInGarrison[];
};
