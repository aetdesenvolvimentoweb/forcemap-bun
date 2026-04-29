export interface DeleteTelephonistUseCase {
  delete(id: string): Promise<void>;
}
