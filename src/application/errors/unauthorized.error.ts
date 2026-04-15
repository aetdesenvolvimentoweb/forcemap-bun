import { AppError } from "../../domain/errors";

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401);
    this.name = "UnauthorizedError";
  }
}
