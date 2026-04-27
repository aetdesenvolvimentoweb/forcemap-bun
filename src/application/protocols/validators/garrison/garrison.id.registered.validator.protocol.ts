export interface GarrisonIdRegisteredValidatorProtocol {
  validate(id: string): Promise<void>;
}
