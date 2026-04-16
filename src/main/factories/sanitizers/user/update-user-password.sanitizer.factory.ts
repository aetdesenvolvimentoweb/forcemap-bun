import { UpdateUserPasswordSanitizerProtocol } from "../../../../application/protocols";
import { UpdateUserPasswordSanitizer } from "../../../../application/sanitizers/user";

export const makeUpdateUserPasswordSanitizer =
  (): UpdateUserPasswordSanitizerProtocol => {
    return new UpdateUserPasswordSanitizer();
  };
