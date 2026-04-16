import { PasswordHasherProtocol } from "../../../application/protocols";
import { WebCryptoPasswordHasherAdapter } from "../../../infra/adapters";

export const makePasswordHasher = (): PasswordHasherProtocol => {
  return new WebCryptoPasswordHasherAdapter();
};
