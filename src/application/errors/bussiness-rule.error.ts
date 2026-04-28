import { AppError } from "../../domain/errors";

export class BusinessRuleError extends AppError {
  constructor(msg: string) {
    super(msg, 422);
    this.name = "BusinessRuleError";
  }
}
