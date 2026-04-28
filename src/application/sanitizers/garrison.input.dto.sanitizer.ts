import { GarrisonInputDTO } from "../../domain/dtos";
import { WorkPeriod, WorkSchedule } from "../../domain/enums";
import {
  GarrisonInputDTOSanitizerProtocol,
  IdSanitizerProtocol,
} from "../protocols";
import { sanitizeString } from "../utils";

interface GarrisonInputDTOSanitizerProps {
  idSanitizer: IdSanitizerProtocol;
}

export class GarrisonInputDTOSanitizer implements GarrisonInputDTOSanitizerProtocol {
  constructor(private readonly props: GarrisonInputDTOSanitizerProps) {}

  public readonly sanitize = (data: GarrisonInputDTO): GarrisonInputDTO => {
    const sanitized = {
      vehicleId: this.props.idSanitizer.sanitize(data.vehicleId),
      militaryInGarrison: data.militaryInGarrison.map((item) => ({
        militaryId: this.props.idSanitizer.sanitize(item.militaryId),
        workPeriod: sanitizeString(item.workPeriod) as WorkPeriod,
        workSchedule: sanitizeString(item.workSchedule) as WorkSchedule,
      })),
    };
    return sanitized;
  };
}
