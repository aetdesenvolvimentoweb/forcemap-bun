export interface VehicleInUseValidatorProtocol {
  validate(vehicleId: string): Promise<void>;
}
