import { ACAInputDTO } from "../../domain/dtos";
import { WorkPeriod, WorkSchedule } from "../../domain/enums";
import {
  ACAInputDTOSanitizerProtocol,
  IdSanitizerProtocol,
} from "../protocols";
import { sanitizeName } from "../utils";

interface ACAInputDTOSanitizerProps {
  idSanitizer: IdSanitizerProtocol;
}

export class ACAInputDTOSanitizer implements ACAInputDTOSanitizerProtocol {
  constructor(private readonly props: ACAInputDTOSanitizerProps) {}

  public readonly sanitize = (data: ACAInputDTO): ACAInputDTO => {
    const sanitized = {
      militaryId: this.props.idSanitizer.sanitize(data.militaryId),
      workPeriod: sanitizeName(data.workPeriod) as WorkPeriod,
      workSchedule: sanitizeName(data.workSchedule) as WorkSchedule,
    };
    return sanitized;
  };
}
