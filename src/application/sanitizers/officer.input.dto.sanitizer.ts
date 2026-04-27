import { OfficerInputDTO } from "../../domain/dtos";
import { WorkPeriod, WorkSchedule } from "../../domain/enums";
import {
  IdSanitizerProtocol,
  OfficerInputDTOSanitizerProtocol,
} from "../protocols";
import { sanitizeName } from "../utils";

interface OfficerInputDTOSanitizerProps {
  idSanitizer: IdSanitizerProtocol;
}

export class OfficerInputDTOSanitizer implements OfficerInputDTOSanitizerProtocol {
  constructor(private readonly props: OfficerInputDTOSanitizerProps) {}

  public readonly sanitize = (data: OfficerInputDTO): OfficerInputDTO => {
    const sanitized = {
      militaryId: this.props.idSanitizer.sanitize(data.militaryId),
      workPeriod: sanitizeName(data.workPeriod) as WorkPeriod,
      workSchedule: sanitizeName(data.workSchedule) as WorkSchedule,
    };
    return sanitized;
  };
}
