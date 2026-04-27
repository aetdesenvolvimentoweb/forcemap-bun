import { UserRole } from "../../../../domain/entities";

export interface GarrisonDeletionPermissionValidatorProtocol {
  validate(garrisonId: string, requestingUserRole: UserRole): Promise<void>;
}
