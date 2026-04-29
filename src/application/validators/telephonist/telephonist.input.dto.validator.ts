import { TelephonistInputDTO } from "../../../domain/dtos";
import { WorkPeriod, WorkSchedule } from "../../../domain/enums";
import {
  MilitaryRepository,
  TelephonistRepository,
} from "../../../domain/repositories";
import { DuplicatedKeyError, EntityNotFoundError } from "../../errors";
import {
  IdValidatorProtocol,
  TelephonistInputDTOValidatorProtocol,
} from "../../protocols";
import { ValidationPatterns } from "../common";

interface TelephonistInputDTOValidatorProps {
  telephonistRepository: TelephonistRepository;
  militaryRepository: MilitaryRepository;
  idValidator: IdValidatorProtocol;
}

export class TelephonistInputDTOValidator implements TelephonistInputDTOValidatorProtocol {
  constructor(private readonly props: TelephonistInputDTOValidatorProps) {}

  private readonly validateMilitaryIdPresence = (militaryId: string): void => {
    ValidationPatterns.validatePresence(militaryId, "Telefonista");
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
    const exists =
      await this.props.telephonistRepository.findByMilitaryId(militaryId);
    if (exists && (!idToIgnore || exists.id !== idToIgnore)) {
      throw new DuplicatedKeyError("Telefonista");
    }
  };

  private readonly validateRequiredFields = (
    data: TelephonistInputDTO,
  ): void => {
    this.validateMilitaryIdPresence(data.militaryId);
    this.validateWorkPeriodPresence(data.workPeriod);
    this.validateWorkSchedulePresence(data.workSchedule);
  };

  private readonly validateBusinessRules = async (
    data: TelephonistInputDTO,
  ): Promise<void> => {
    const { idValidator, militaryRepository } = this.props;

    idValidator.validate(data.militaryId);
    const military = await militaryRepository.findById(data.militaryId);

    if (!military) {
      throw new EntityNotFoundError("Telefonista");
    }

    this.validateWorkPeriodFormat(data.workPeriod);
    this.validateWorkScheduleFormat(data.workSchedule);
  };

  private readonly validateUniqueness = async (
    data: TelephonistInputDTO,
    idToIgnore?: string,
  ): Promise<void> => {
    await this.validateMilitaryIdUniqueness(data.militaryId, idToIgnore);
  };

  /**
   * Valida para create (idToIgnore não informado) ou update (idToIgnore informado)
   */
  public readonly validate = async (
    data: TelephonistInputDTO,
    idToIgnore?: string,
  ): Promise<void> => {
    this.validateRequiredFields(data);
    await this.validateBusinessRules(data);
    await this.validateUniqueness(data, idToIgnore);
  };
}
