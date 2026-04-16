import { UpdateUserRoleSanitizerProtocol } from "../../../../application/protocols";
import { UpdateUserRoleSanitizer } from "../../../../application/sanitizers";

export const makeUpdateUserRoleSanitizer =
  (): UpdateUserRoleSanitizerProtocol => {
    return new UpdateUserRoleSanitizer();
  };
