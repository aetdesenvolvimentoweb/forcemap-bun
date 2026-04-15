import log from "loglevel";

import { LoggerProtocol } from "../../application/protocols";

export class LogLevelLoggerAdapter implements LoggerProtocol {
  private logger: log.Logger;

  constructor() {
    this.logger = log.getLogger("forcemap");
    this.logger.setLevel("debug"); // Configurado para debug para ver todos os logs
  }

  info(message: string, meta?: Record<string, unknown>): void {
    if (meta) {
      this.logger.info(message, meta);
    } else {
      this.logger.info(message);
    }
  }

  warn(message: string, meta?: Record<string, unknown>): void {
    if (meta) {
      this.logger.warn(message, meta);
    } else {
      this.logger.warn(message);
    }
  }

  error(message: string, meta?: Record<string, unknown>): void {
    if (meta) {
      this.logger.error(message, meta);
    } else {
      this.logger.error(message);
    }
  }

  debug(message: string, meta?: Record<string, unknown>): void {
    if (meta) {
      this.logger.debug(message, meta);
    } else {
      this.logger.debug(message);
    }
  }
}
