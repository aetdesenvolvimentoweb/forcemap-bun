import { GarrisonInputDTOSanitizerProtocol } from "../../../application/protocols";
import { GarrisonInputDTOSanitizer } from "../../../application/sanitizers";
import { makeIdSanitizer } from "./id.sanitizer.factory";

export const makeGarrisonInputDTOSanitizer =
  (): GarrisonInputDTOSanitizerProtocol => {
    const idSanitizer = makeIdSanitizer();
    return new GarrisonInputDTOSanitizer({
      idSanitizer,
    });
  };
