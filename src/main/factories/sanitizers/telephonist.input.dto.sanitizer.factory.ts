import { TelephonistInputDTOSanitizerProtocol } from "../../../application/protocols";
import { TelephonistInputDTOSanitizer } from "../../../application/sanitizers";
import { makeIdSanitizer } from "./id.sanitizer.factory";

export const makeTelephonistInputDTOSanitizer =
  (): TelephonistInputDTOSanitizerProtocol => {
    const idSanitizer = makeIdSanitizer();
    return new TelephonistInputDTOSanitizer({
      idSanitizer,
    });
  };
