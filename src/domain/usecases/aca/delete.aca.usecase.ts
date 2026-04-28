export interface DeleteACAUseCase {
  delete(id: string): Promise<void>;
}
