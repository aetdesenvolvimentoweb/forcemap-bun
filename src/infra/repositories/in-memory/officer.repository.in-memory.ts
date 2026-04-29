import { EntityNotFoundError } from "../../../application/errors";
import { OfficerInputDTO, OfficerOutputDTO } from "../../../domain/dtos";
import { Officer } from "../../../domain/entities";
import { WorkPeriod } from "../../../domain/enums";
import {
  MilitaryRepository,
  OfficerRepository,
} from "../../../domain/repositories";

export class OfficerRepositoryInMemory implements OfficerRepository {
  private items: Officer[] = [];

  constructor(private readonly militaryRepository: MilitaryRepository) {}

  private mapperOfficer = async (
    officer: Officer,
  ): Promise<OfficerOutputDTO> => {
    if (!officer.military) {
      throw new EntityNotFoundError("Oficial");
    }

    return {
      id: officer.id,
      military: officer.military,
      workPeriod: officer.workPeriod,
      workSchedule: officer.workSchedule,
    };
  };

  public create = async (data: OfficerInputDTO): Promise<void> => {
    const military = await this.militaryRepository.findById(data.militaryId);

    if (!military || !military.id) {
      throw new EntityNotFoundError("Oficial");
    }

    const officer: Officer = {
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

    this.items.push(officer);
  };

  public delete = async (id: string): Promise<void> => {
    this.items = this.items.filter((item) => item.id !== id);
  };

  public findByMilitaryId = async (
    militaryId: string,
  ): Promise<OfficerOutputDTO | null> => {
    const officer = this.items.find((item) => item.militaryId === militaryId);

    if (!officer) {
      return null;
    }

    const officerMapped = await this.mapperOfficer(officer);
    return officerMapped;
  };

  public findByWorkPeriod = async (
    workPeriod: WorkPeriod,
  ): Promise<OfficerOutputDTO | null> => {
    const officer = this.items.find((item) => item.workPeriod === workPeriod);

    if (!officer) {
      return null;
    }
    const officerMapped = this.mapperOfficer(officer);
    return officerMapped;
  };

  public findById = async (id: string): Promise<OfficerOutputDTO | null> => {
    const officer = this.items.find((item) => item.id === id);
    if (!officer) {
      return null;
    }

    const officerMapped = await this.mapperOfficer(officer);
    return officerMapped;
  };

  public listAll = async (): Promise<OfficerOutputDTO[]> => {
    const officersMapped = await Promise.all(
      this.items.map((officer) => this.mapperOfficer(officer)),
    );
    return officersMapped;
  };

  public update = async (id: string, data: OfficerInputDTO): Promise<void> => {
    const index = this.items.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.items[index] = { ...this.items[index], ...data };
    }
  };
}
