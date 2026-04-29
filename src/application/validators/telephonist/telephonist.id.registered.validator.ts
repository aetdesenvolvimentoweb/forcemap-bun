import { TelephonistRepository } from "../../../domain/repositories";
import { EntityNotFoundError } from "../../errors";
import { TelephonistIdRegisteredValidatorProtocol } from "../../protocols";

interface TelephonistIdRegisteredValidatorProps {
  telephonistRepository: TelephonistRepository;
}

export class TelephonistIdRegisteredValidator implements TelephonistIdRegisteredValidatorProtocol {
  constructor(private readonly props: TelephonistIdRegisteredValidatorProps) {}

  validate = async (id: string): Promise<void> => {
    const { telephonistRepository } = this.props;
    const telephonist = await telephonistRepository.findById(id);

    if (!telephonist) {
      throw new EntityNotFoundError("Telefonista");
    }
  };
}
