export interface TelephonistIdRegisteredValidatorProtocol {
  validate(id: string): Promise<void>;
}
