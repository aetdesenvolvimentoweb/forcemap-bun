import { EntityNotFoundError } from "../../../application/errors";
import {
  TelephonistInputDTO,
  TelephonistOutputDTO,
} from "../../../domain/dtos";
import { Telephonist } from "../../../domain/entities";
import { WorkPeriod } from "../../../domain/enums";
import {
  MilitaryRepository,
  TelephonistRepository,
} from "../../../domain/repositories";

export class TelephonistRepositoryInMemory implements TelephonistRepository {
  private items: Telephonist[] = [];

  constructor(private readonly militaryRepository: MilitaryRepository) {}

  private mapperTelephonist = async (
    telephonist: Telephonist,
  ): Promise<TelephonistOutputDTO> => {
    if (!telephonist.military) {
      throw new EntityNotFoundError("Telefonista");
    }

    return {
      id: telephonist.id,
      military: telephonist.military,
      workPeriod: telephonist.workPeriod,
      workSchedule: telephonist.workSchedule,
    };
  };

  public create = async (data: TelephonistInputDTO): Promise<void> => {
    const military = await this.militaryRepository.findById(data.militaryId);

    if (!military) {
      throw new EntityNotFoundError("Telefonista");
    }

    const telephonist: Telephonist = {
      ...data,
      id: crypto.randomUUID(),
      military: {
        id: military.id,
        militaryRankId: military.militaryRank.id,
        militaryRank: military.militaryRank,
        rg: military.rg,
        name: military.name,
      },
    };

    this.items.push(telephonist);
  };

  public delete = async (id: string): Promise<void> => {
    this.items = this.items.filter((item) => item.id !== id);
  };

  public findByMilitaryId = async (
    militaryId: string,
  ): Promise<TelephonistOutputDTO | null> => {
    const telephonist = this.items.find(
      (item) => item.militaryId === militaryId,
    );

    if (!telephonist) {
      return null;
    }

    const telephonistMapped = await this.mapperTelephonist(telephonist);
    return telephonistMapped;
  };

  public findByWorkPeriod = async (
    workPeriod: WorkPeriod,
  ): Promise<TelephonistOutputDTO | null> => {
    const telephonist = this.items.find(
      (item) => item.workPeriod === workPeriod,
    );

    if (!telephonist) {
      return null;
    }
    const telephonistMapped = await this.mapperTelephonist(telephonist);
    return telephonistMapped;
  };

  public findById = async (
    id: string,
  ): Promise<TelephonistOutputDTO | null> => {
    const telephonist = this.items.find((item) => item.id === id);
    if (!telephonist) {
      return null;
    }

    const telephonistMapped = await this.mapperTelephonist(telephonist);
    return telephonistMapped;
  };

  public listAll = async (): Promise<TelephonistOutputDTO[]> => {
    const telephonistsMapped = await Promise.all(
      this.items.map((telephonist) => this.mapperTelephonist(telephonist)),
    );
    return telephonistsMapped;
  };

  public update = async (
    id: string,
    data: TelephonistInputDTO,
  ): Promise<void> => {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      return;
    }

    const military = await this.militaryRepository.findById(data.militaryId);

    if (!military) {
      throw new EntityNotFoundError("Telefonista");
    }

    this.items[index] = {
      ...this.items[index],
      ...data,
      military: {
        id: military.id,
        militaryRankId: military.militaryRank.id,
        militaryRank: military.militaryRank,
        rg: military.rg,
        name: military.name,
      },
    };
  };
}
