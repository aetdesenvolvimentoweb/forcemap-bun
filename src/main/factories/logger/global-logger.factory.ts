import { LoggerProtocol } from "../../../application/protocols";
import { LogLevelLoggerAdapter } from "../../../infra/adapters/log-level.logger.adapter";

let globalLoggerInstance: LoggerProtocol | null = null;

/**
 * Factory para criar ou retornar a instância global do logger.
 * Usa singleton pattern para garantir uma única instância na aplicação.
 */
export const makeGlobalLogger = (): LoggerProtocol => {
  if (!globalLoggerInstance) {
    globalLoggerInstance = new LogLevelLoggerAdapter();
  }

  return globalLoggerInstance;
};
