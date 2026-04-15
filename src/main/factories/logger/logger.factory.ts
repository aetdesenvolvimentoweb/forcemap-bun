import { LoggerProtocol } from "../../../application/protocols";
import { LogLevelLoggerAdapter } from "../../../infra/adapters";

export const makeLogger = (): LoggerProtocol => {
  return new LogLevelLoggerAdapter();
};
