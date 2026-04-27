export interface DeleteOfficerUseCase {
  delete(id: string): Promise<void>;
}
