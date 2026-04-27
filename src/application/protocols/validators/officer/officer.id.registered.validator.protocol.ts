export interface OfficerIdRegisteredValidatorProtocol {
  validate(id: string): Promise<void>;
}
