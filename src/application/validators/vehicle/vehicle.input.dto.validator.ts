import { VehicleInputDTO } from "../../../domain/dtos";
import { VehicleSituation } from "../../../domain/entities";
import { VehicleRepository } from "../../../domain/repositories";
import { DuplicatedKeyError } from "../../errors";
import { VehicleInputDTOValidatorProtocol } from "../../protocols";
import { ValidationPatterns } from "../common";

interface VehicleInputDTOValidatorProps {
  vehicleRepository: VehicleRepository;
}

export class VehicleInputDTOValidator implements VehicleInputDTOValidatorProtocol {
  constructor(private readonly props: VehicleInputDTOValidatorProps) {}

  private readonly validateNamePresence = (name: string): void => {
    ValidationPatterns.validatePresence(name, "Nome");
  };

  private readonly validateSituationPresence = (
    situation: VehicleSituation,
  ): void => {
    ValidationPatterns.validatePresence(situation, "Situação");
  };

  private readonly validateNameFormat = (name: string): void => {
    ValidationPatterns.validateStringLength(name, 20, "Nome");

    ValidationPatterns.validateStringFormat(
      name,
      /^[A-Z0-9-]+$/,
      "Nome",
      "deve conter apenas letras maiúsculas, números e/ou hífen",
    );
  };

  private readonly validateSituationFormat = (
    situation: VehicleSituation,
  ): void => {
    ValidationPatterns.validateStringFormat(
      situation,
      /^(ativa|baixada)$/,
      "Situação",
      "deve ser 'ativa' ou 'baixada'",
    );
  };

  private readonly validateComplementFormat = (complement: string): void => {
    ValidationPatterns.validateStringLength(complement, 100, "Complemento");

    ValidationPatterns.validateStringFormat(
      complement,
      /^[a-zA-ZÀ-ÖØ-öø-ÿ0-9\s().,'`\-/]+$/,
      "Complemento",
      "deve conter apenas letras, números, espaços e/ou pontuação",
    );
  };

  private readonly validateNameUniqueness = async (
    name: string,
    idToIgnore?: string,
  ): Promise<void> => {
    const exists = await this.props.vehicleRepository.findByName(name);
    if (exists && (!idToIgnore || exists.id !== idToIgnore)) {
      throw new DuplicatedKeyError("Nome");
    }
  };

  private readonly validateRequiredFields = (data: VehicleInputDTO): void => {
    this.validateNamePresence(data.name);
    this.validateSituationPresence(data.situation);
  };

  private readonly validateBusinessRules = (data: VehicleInputDTO): void => {
    this.validateNameFormat(data.name);
    this.validateSituationFormat(data.situation);
    if (data.complement) {
      this.validateComplementFormat(data.complement);
    }
  };

  private readonly validateUniqueness = async (
    data: VehicleInputDTO,
    idToIgnore?: string,
  ): Promise<void> => {
    await this.validateNameUniqueness(data.name, idToIgnore);
  };

  /**
   * Valida para create (idToIgnore não informado) ou update (idToIgnore informado)
   */
  public readonly validate = async (
    data: VehicleInputDTO,
    idToIgnore?: string,
  ): Promise<void> => {
    this.validateRequiredFields(data);
    this.validateBusinessRules(data);
    await this.validateUniqueness(data, idToIgnore);
  };
}
