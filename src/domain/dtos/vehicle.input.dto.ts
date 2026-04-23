import { VehicleSituation } from "../entities";

export type VehicleInputDTO = {
  name: string;
  situation: VehicleSituation;
  complement?: string;
};
