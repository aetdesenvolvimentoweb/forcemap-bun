import { GarrisonInputDTO } from "../../../domain/dtos";
import { MilitaryInGarrison, WorkPeriod } from "../../../domain/entities";
import {
  MilitaryRepository,
  VehicleRepository,
} from "../../../domain/repositories";
import { EntityNotFoundError, InvalidParamError, MissingParamError } from "../../errors";
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

  private readonly validateSchedulesPresence = (
    militaryInGarrison: MilitaryInGarrison[],
  ): void => {
    militaryInGarrison.forEach((item, index) => {
      ValidationPatterns.validatePresence(
        item.schedule,
        `Regime de trabalho do militar ${index + 1}`,
      );
    });
  };

  private readonly validateWorkPeriodCombination = (
    militaryInGarrison: MilitaryInGarrison[],
  ): void => {
    if (militaryInGarrison.length === 1) {
      if (militaryInGarrison[0].period !== WorkPeriod.Integral) {
        throw new InvalidParamError(
          "Período de Trabalho",
          "com apenas um militar, o período deve ser Integral",
        );
      }
      return;
    }

    const hasDiurno = militaryInGarrison.some(
      (m) => m.period === WorkPeriod.Diurno || m.period === WorkPeriod.Integral,
    );
    const hasNoturno = militaryInGarrison.some(
      (m) => m.period === WorkPeriod.Noturno || m.period === WorkPeriod.Integral,
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
    this.validateSchedulesPresence(data.militaryInGarrison);
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
