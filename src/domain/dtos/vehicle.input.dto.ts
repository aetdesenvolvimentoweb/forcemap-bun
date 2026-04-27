import { VehicleSituation } from "../enums";

export type VehicleInputDTO = {
  name: string;
  situation: VehicleSituation;
  complement?: string;
};
