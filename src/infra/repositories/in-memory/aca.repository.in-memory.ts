import { EntityNotFoundError } from "../../../application/errors";
import { ACAInputDTO, ACAOutputDTO } from "../../../domain/dtos";
import { ACA } from "../../../domain/entities";
import { WorkPeriod } from "../../../domain/enums";
import {
  ACARepository,
  MilitaryRepository,
} from "../../../domain/repositories";

export class ACARepositoryInMemory implements ACARepository {
  private items: ACA[] = [];

  constructor(private readonly militaryRepository: MilitaryRepository) {}

  private mapperACA = async (aca: ACA): Promise<ACAOutputDTO> => {
    if (!aca.military) {
      throw new EntityNotFoundError("ACA");
    }

    return {
      id: aca.id,
      military: aca.military,
      workPeriod: aca.workPeriod,
      workSchedule: aca.workSchedule,
    };
  };

  public create = async (data: ACAInputDTO): Promise<void> => {
    const military = await this.militaryRepository.findById(data.militaryId);
    const entity: ACA = {
      ...data,
      id: crypto.randomUUID(),
      military: military
        ? {
            id: military.id,
            militaryRankId: military.militaryRank.id,
            militaryRank: military.militaryRank,
            rg: military.rg,
            name: military.name,
          }
        : undefined,
    };
    this.items.push(entity);
  };

  public delete = async (id: string): Promise<void> => {
    this.items = this.items.filter((item) => item.id !== id);
  };

  public findByMilitaryId = async (
    militaryId: string,
  ): Promise<ACAOutputDTO | null> => {
    const aca = this.items.find((item) => item.militaryId === militaryId);

    if (!aca) {
      return null;
    }

    const acaMapped = await this.mapperACA(aca);
    return acaMapped;
  };

  public findByWorkPeriod = async (
    workPeriod: WorkPeriod,
  ): Promise<ACAOutputDTO | null> => {
    const aca = this.items.find((item) => item.workPeriod === workPeriod);

    if (!aca) {
      return null;
    }
    const acaMapped = await this.mapperACA(aca);
    return acaMapped;
  };

  public findById = async (id: string): Promise<ACAOutputDTO | null> => {
    const aca = this.items.find((item) => item.id === id);
    if (!aca) {
      return null;
    }

    const acaMapped = await this.mapperACA(aca);
    return acaMapped;
  };

  public listAll = async (): Promise<ACAOutputDTO[]> => {
    const acasMapped = await Promise.all(
      this.items.map((aca) => this.mapperACA(aca)),
    );
    return acasMapped;
  };

  public update = async (id: string, data: ACAInputDTO): Promise<void> => {
    const index = this.items.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.items[index] = { ...this.items[index], ...data };
    }
  };
}
