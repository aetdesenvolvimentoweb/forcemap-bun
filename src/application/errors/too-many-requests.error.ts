import { AppError } from "../../domain/errors";

export class TooManyRequestsError extends AppError {
  constructor(message: string) {
    super(message, 429);
    this.name = "TooManyRequestsError";
  }
}
