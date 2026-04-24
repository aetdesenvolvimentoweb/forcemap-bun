export enum WorkPeriod {
  Diurno = "Diurno",
  Noturno = "Noturno",
  Integral = "Integral",
}

export enum WorkSchedule {
  Ordinario = "Ordinário",
  AC4OBM = "AC4 - OBM",
  AC4Prefeitura = "Prefeitura",
}

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
