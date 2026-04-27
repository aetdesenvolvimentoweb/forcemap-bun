import { GarrisonRepository } from "../../../domain/repositories";
import { EntityNotFoundError } from "../../errors";
import { GarrisonIdRegisteredValidatorProtocol } from "../../protocols";

interface GarrisonIdRegisteredValidatorProps {
  garrisonRepository: GarrisonRepository;
}

export class GarrisonIdRegisteredValidator implements GarrisonIdRegisteredValidatorProtocol {
  constructor(private readonly props: GarrisonIdRegisteredValidatorProps) {}

  validate = async (id: string): Promise<void> => {
    const { garrisonRepository } = this.props;
    const garrison = await garrisonRepository.findById(id);

    if (!garrison) {
      throw new EntityNotFoundError("Guarnição");
    }
  };
}
