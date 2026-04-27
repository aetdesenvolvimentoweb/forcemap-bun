import { OfficerInputDTOSanitizerProtocol } from "../../../application/protocols";
import { OfficerInputDTOSanitizer } from "../../../application/sanitizers";
import { makeIdSanitizer } from "./id.sanitizer.factory";

export const makeOfficerInputDTOSanitizer =
  (): OfficerInputDTOSanitizerProtocol => {
    const idSanitizer = makeIdSanitizer();
    return new OfficerInputDTOSanitizer({
      idSanitizer,
    });
  };
