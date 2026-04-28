import { ACAInputDTO } from "../../../domain/dtos";
import { WorkPeriod, WorkSchedule } from "../../../domain/enums";
import {
  ACARepository,
  MilitaryRepository,
} from "../../../domain/repositories";
import {
  BusinessRuleError,
  DuplicatedKeyError,
  EntityNotFoundError,
} from "../../errors";
import {
  ACAInputDTOValidatorProtocol,
  IdValidatorProtocol,
} from "../../protocols";
import { ValidationPatterns } from "../common";

interface ACAInputDTOValidatorProps {
  acaRepository: ACARepository;
  militaryRepository: MilitaryRepository;
  idValidator: IdValidatorProtocol;
}

export class ACAInputDTOValidator implements ACAInputDTOValidatorProtocol {
  constructor(private readonly props: ACAInputDTOValidatorProps) {}

  private readonly validateMilitaryIdPresence = (militaryId: string): void => {
    ValidationPatterns.validatePresence(militaryId, "ACA");
  };

  private readonly validateWorkPeriodPresence = (
    workPeriod: WorkPeriod,
  ): void => {
    ValidationPatterns.validatePresence(workPeriod, "Período de Trabalho");
  };

  private readonly validateWorkSchedulePresence = (
    workSchedule: WorkSchedule,
  ): void => {
    ValidationPatterns.validatePresence(workSchedule, "Regime de Trabalho");
  };

  private readonly validateWorkPeriodFormat = (
    workPeriod: WorkPeriod,
  ): void => {
    ValidationPatterns.validateEnum(
      workPeriod,
      WorkPeriod,
      "Período de Trabalho",
    );
  };

  private readonly validateWorkScheduleFormat = (
    workSchedule: WorkSchedule,
  ): void => {
    ValidationPatterns.validateEnum(
      workSchedule,
      WorkSchedule,
      "Regime de Trabalho",
    );
  };

  private readonly validateMilitaryIdUniqueness = async (
    militaryId: string,
    idToIgnore?: string,
  ): Promise<void> => {
    const exists = await this.props.acaRepository.findByMilitaryId(militaryId);
    if (exists && (!idToIgnore || exists.id !== idToIgnore)) {
      throw new DuplicatedKeyError("ACA");
    }
  };

  private readonly validateRequiredFields = (data: ACAInputDTO): void => {
    this.validateMilitaryIdPresence(data.militaryId);
    this.validateWorkPeriodPresence(data.workPeriod);
    this.validateWorkSchedulePresence(data.workSchedule);
  };

  private readonly validateBusinessRules = async (
    data: ACAInputDTO,
  ): Promise<void> => {
    const { idValidator, militaryRepository } = this.props;

    idValidator.validate(data.militaryId);
    const military = await militaryRepository.findById(data.militaryId);

    if (!military) {
      throw new EntityNotFoundError("ACA");
    }

    if (military.militaryRank.order > 7) {
      throw new BusinessRuleError(
        "O militar deve ter patente igual ou inferior a Subtenente para essa função.",
      );
    }

    this.validateWorkPeriodFormat(data.workPeriod);
    this.validateWorkScheduleFormat(data.workSchedule);
  };

  private readonly validateUniqueness = async (
    data: ACAInputDTO,
    idToIgnore?: string,
  ): Promise<void> => {
    await this.validateMilitaryIdUniqueness(data.militaryId, idToIgnore);
  };

  /**
   * Valida para create (idToIgnore não informado) ou update (idToIgnore informado)
   */
  public readonly validate = async (
    data: ACAInputDTO,
    idToIgnore?: string,
  ): Promise<void> => {
    this.validateRequiredFields(data);
    await this.validateBusinessRules(data);
    await this.validateUniqueness(data, idToIgnore);
  };
}
