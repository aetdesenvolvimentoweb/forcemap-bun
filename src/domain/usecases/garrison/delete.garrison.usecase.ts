import { UserRole } from "../../entities";

export interface DeleteGarrisonUseCase {
  delete(id: string, requestingUserRole?: UserRole): Promise<void>;
}
