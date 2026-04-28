export interface ACAIdRegisteredValidatorProtocol {
  validate(id: string): Promise<void>;
}
