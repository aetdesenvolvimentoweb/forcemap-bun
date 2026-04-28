import { ACAInputDTOSanitizerProtocol } from "../../../application/protocols";
import { ACAInputDTOSanitizer } from "../../../application/sanitizers";
import { makeIdSanitizer } from "./id.sanitizer.factory";

export const makeACAInputDTOSanitizer = (): ACAInputDTOSanitizerProtocol => {
  const idSanitizer = makeIdSanitizer();
  return new ACAInputDTOSanitizer({
    idSanitizer,
  });
};
