import { AppError } from "../../domain/errors";

export class ConfigurationError extends AppError {
  constructor(message: string) {
    super(`Erro de configuração: ${message}`, 500);
    this.name = "ConfigurationError";
  }
}
