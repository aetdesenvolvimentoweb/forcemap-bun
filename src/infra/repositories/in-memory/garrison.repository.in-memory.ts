import { EntityNotFoundError } from "../../../application/errors";
import {
  GarrisonInputDTO,
  GarrisonOutputDTO,
  MilitaryInGarrisonOutputDTO,
} from "../../../domain/dtos";
import { Garrison } from "../../../domain/entities";
import { WorkPeriod } from "../../../domain/enums";
import {
  GarrisonRepository,
  MilitaryRepository,
  VehicleRepository,
} from "../../../domain/repositories";

export class GarrisonRepositoryInMemory implements GarrisonRepository {
  private items: Garrison[] = [];

  constructor(
    private readonly militaryRepository: MilitaryRepository,
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  private mapperGarrison = async (
    garrison: Garrison,
  ): Promise<GarrisonOutputDTO> => {
    if (
      !garrison.militaryInGarrison ||
      garrison.militaryInGarrison.length === 0
    ) {
      throw new EntityNotFoundError("Guarnição");
    }

    if (!garrison.vehicle) {
      throw new EntityNotFoundError("Viatura");
    }

    return {
      vehicle: garrison.vehicle,
      militaryInGarrison: garrison.militaryInGarrison.map((m) => {
        if (!m.military) {
          throw new EntityNotFoundError("Militar");
        }
        return {
          military: m.military,
          workPeriod: m.workPeriod,
          workSchedule: m.workSchedule,
        } as MilitaryInGarrisonOutputDTO;
      }),
    };
  };

  public create = async (data: GarrisonInputDTO): Promise<void> => {
    const [allMilitary, vehicle] = await Promise.all([
      this.militaryRepository.listAll(),
      this.vehicleRepository.findById(data.vehicleId),
    ]);

    if (!allMilitary || allMilitary.length === 0) {
      throw new EntityNotFoundError("Militar");
    }

    if (!vehicle) {
      throw new EntityNotFoundError("Viatura");
    }

    const garrison: Garrison = {
      ...data,
      id: crypto.randomUUID(),
      vehicle: vehicle,
      militaryInGarrison: data.militaryInGarrison.map((m) => {
        const foundMilitary = allMilitary.find(
          (mil) => mil.id === m.militaryId,
        );
        if (!foundMilitary) {
          throw new EntityNotFoundError("Militar");
        }
        return {
          ...m,
          military: {
            id: foundMilitary.id,
            militaryRankId: foundMilitary.militaryRank.id,
            militaryRank: foundMilitary.militaryRank,
            rg: foundMilitary.rg,
            name: foundMilitary.name,
          },
        };
      }),
    };
    this.items.push(garrison);
  };

  public delete = async (id: string): Promise<void> => {
    this.items = this.items.filter((item) => item.id !== id);
  };

  public findByMilitaryId = async (
    militaryId: string,
  ): Promise<GarrisonOutputDTO | null> => {
    const garrison = this.items.find((item) =>
      item.militaryInGarrison.some((m) => m.militaryId === militaryId),
    );

    if (!garrison) {
      return null;
    }

    const garrisonMapped = await this.mapperGarrison(garrison);
    return garrisonMapped;
  };

  public findByWorkPeriod = async (
    workPeriod: WorkPeriod,
  ): Promise<GarrisonOutputDTO | null> => {
    const garrison = this.items.find((item) =>
      item.militaryInGarrison.some((m) => m.workPeriod === workPeriod),
    );

    if (!garrison) {
      return null;
    }
    const garrisonMapped = await this.mapperGarrison(garrison);
    return garrisonMapped;
  };

  public findById = async (id: string): Promise<GarrisonOutputDTO | null> => {
    const garrison = this.items.find((item) => item.id === id);
    if (!garrison) {
      return null;
    }

    const garrisonMapped = await this.mapperGarrison(garrison);
    return garrisonMapped;
  };

  public listAll = async (): Promise<GarrisonOutputDTO[]> => {
    const garrisonsMapped = await Promise.all(
      this.items.map((garrison) => this.mapperGarrison(garrison)),
    );
    return garrisonsMapped;
  };

  public update = async (id: string, data: GarrisonInputDTO): Promise<void> => {
    const index = this.items.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.items[index] = { ...this.items[index], ...data };
    }
  };
}
