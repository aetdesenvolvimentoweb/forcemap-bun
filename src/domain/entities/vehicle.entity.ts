import { VehicleSituation } from "../enums";

export type Vehicle = {
  id: string;
  name: string;
  situation: VehicleSituation;
  complement?: string;
};
