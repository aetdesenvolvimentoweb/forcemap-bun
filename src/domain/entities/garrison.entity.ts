import { WorkPeriod, WorkSchedule } from "../enums";

export type MilitaryInGarrison = {
  militaryId: string;
  period: WorkPeriod;
  schedule: WorkSchedule;
};

export type Garrison = {
  id: string;
  vehicleId: string;
  militaryInGarrison: MilitaryInGarrison[];
};
