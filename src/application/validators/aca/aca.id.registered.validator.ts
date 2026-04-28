import { ACARepository } from "../../../domain/repositories";
import { EntityNotFoundError } from "../../errors";
import { ACAIdRegisteredValidatorProtocol } from "../../protocols";

interface ACAIdRegisteredValidatorProps {
  acaRepository: ACARepository;
}

export class ACAIdRegisteredValidator implements ACAIdRegisteredValidatorProtocol {
  constructor(private readonly props: ACAIdRegisteredValidatorProps) {}

  validate = async (id: string): Promise<void> => {
    const { acaRepository } = this.props;
    const aca = await acaRepository.findById(id);

    if (!aca) {
      throw new EntityNotFoundError("ACA");
    }
  };
}
