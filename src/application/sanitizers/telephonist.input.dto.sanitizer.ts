import { TelephonistInputDTO } from "../../domain/dtos";
import { WorkPeriod, WorkSchedule } from "../../domain/enums";
import {
  IdSanitizerProtocol,
  TelephonistInputDTOSanitizerProtocol,
} from "../protocols";
import { sanitizeName } from "../utils";

interface TelephonistInputDTOSanitizerProps {
  idSanitizer: IdSanitizerProtocol;
}

export class TelephonistInputDTOSanitizer implements TelephonistInputDTOSanitizerProtocol {
  constructor(private readonly props: TelephonistInputDTOSanitizerProps) {}

  public readonly sanitize = (
    data: TelephonistInputDTO,
  ): TelephonistInputDTO => {
    const sanitized = {
      militaryId: this.props.idSanitizer.sanitize(data.militaryId),
      workPeriod: sanitizeName(data.workPeriod) as WorkPeriod,
      workSchedule: sanitizeName(data.workSchedule) as WorkSchedule,
    };
    return sanitized;
  };
}
