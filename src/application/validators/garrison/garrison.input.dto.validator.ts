import { GarrisonInputDTO } from "../../../domain/dtos";
import { MilitaryInGarrison } from "../../../domain/entities";
import { WorkPeriod, WorkSchedule } from "../../../domain/enums";
import {
  MilitaryRepository,
  VehicleRepository,
} from "../../../domain/repositories";
import {
  EntityNotFoundError,
  InvalidParamError,
  MissingParamError,
} from "../../errors";
import {
  GarrisonInputDTOValidatorProtocol,
  IdValidatorProtocol,
} from "../../protocols";
import { ValidationPatterns } from "../common";

interface GarrisonInputDTOValidatorProps {
  militaryRepository: MilitaryRepository;
  vehicleRepository: VehicleRepository;
  idValidator: IdValidatorProtocol;
}

export class GarrisonInputDTOValidator implements GarrisonInputDTOValidatorProtocol {
  constructor(private readonly props: GarrisonInputDTOValidatorProps) {}

  private readonly validateVehicleIdPresence = (vehicleId: string): void => {
    ValidationPatterns.validatePresence(vehicleId, "Viatura");
  };

  private readonly validateMilitaryInGarrisonPresence = (
    militaryInGarrison: MilitaryInGarrison[],
  ): void => {
    if (!militaryInGarrison || militaryInGarrison.length === 0) {
      throw new MissingParamError("Militar(es)");
    }
  };

  private readonly validateWorkPeriodPresence = (
    militaryInGarrison: MilitaryInGarrison[],
  ): void => {
    militaryInGarrison.forEach((item, index) => {
      ValidationPatterns.validatePresence(
        item.workPeriod,
        `Período de trabalho do militar ${index + 1} da guarnição`,
      );
    });
  };

  private readonly validateWorkSchedulePresence = (
    militaryInGarrison: MilitaryInGarrison[],
  ): void => {
    militaryInGarrison.forEach((item, index) => {
      ValidationPatterns.validatePresence(
        item.workSchedule,
        `Regime de trabalho do militar ${index + 1} da guarnição`,
      );
    });
  };

  private readonly validateWorkPeriodFormat = (
    militaryInGarrison: MilitaryInGarrison[],
  ): void => {
    militaryInGarrison.forEach((item, index) => {
      ValidationPatterns.validateEnum(
        item.workPeriod,
        WorkPeriod,
        `Período de trabalho do militar ${index + 1} da guarnição`,
      );
    });
  };

  private readonly validateWorkScheduleFormat = (
    militaryInGarrison: MilitaryInGarrison[],
  ): void => {
    militaryInGarrison.forEach((item, index) => {
      ValidationPatterns.validateEnum(
        item.workSchedule,
        WorkSchedule,
        `Regime de trabalho do militar ${index + 1} da guarnição`,
      );
    });
  };

  private readonly validateWorkPeriodCombination = (
    militaryInGarrison: MilitaryInGarrison[],
  ): void => {
    if (militaryInGarrison.length === 1) {
      if (militaryInGarrison[0].workPeriod !== WorkPeriod.Integral) {
        throw new InvalidParamError(
          "Período de Trabalho",
          "com apenas um militar na guarnição, o período deve ser Integral",
        );
      }
      return;
    }

    const hasDiurno = militaryInGarrison.some(
      (m) =>
        m.workPeriod === WorkPeriod.Diurno ||
        m.workPeriod === WorkPeriod.Integral,
    );
    const hasNoturno = militaryInGarrison.some(
      (m) =>
        m.workPeriod === WorkPeriod.Noturno ||
        m.workPeriod === WorkPeriod.Integral,
    );

    if (!hasDiurno || !hasNoturno) {
      throw new InvalidParamError(
        "Período de Trabalho",
        "a guarnição deve cobrir os períodos diurno e noturno",
      );
    }
  };

  private readonly validateRequiredFields = (data: GarrisonInputDTO): void => {
    this.validateVehicleIdPresence(data.vehicleId);
    this.validateMilitaryInGarrisonPresence(data.militaryInGarrison);
    this.validateWorkPeriodPresence(data.militaryInGarrison);
    this.validateWorkSchedulePresence(data.militaryInGarrison);
  };

  private readonly validateBusinessRules = async (
    data: GarrisonInputDTO,
  ): Promise<void> => {
    const { idValidator, vehicleRepository, militaryRepository } = this.props;

    idValidator.validate(data.vehicleId);
    const vehicle = await vehicleRepository.findById(data.vehicleId);
    if (!vehicle) {
      throw new EntityNotFoundError("Viatura");
    }

    data.militaryInGarrison.forEach((item) =>
      idValidator.validate(item.militaryId),
    );

    const militaries = await Promise.all(
      data.militaryInGarrison.map((item) =>
        militaryRepository.findById(item.militaryId),
      ),
    );

    if (militaries.some((military) => !military)) {
      throw new EntityNotFoundError("Militar");
    }

    this.validateWorkPeriodFormat(data.militaryInGarrison);
    this.validateWorkScheduleFormat(data.militaryInGarrison);
    this.validateWorkPeriodCombination(data.militaryInGarrison);
  };

  public readonly validate = async (
    data: GarrisonInputDTO,
    _idToIgnore?: string,
  ): Promise<void> => {
    this.validateRequiredFields(data);
    await this.validateBusinessRules(data);
  };
}
