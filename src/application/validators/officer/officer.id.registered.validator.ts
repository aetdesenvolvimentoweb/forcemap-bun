import { OfficerRepository } from "../../../domain/repositories";
import { EntityNotFoundError } from "../../errors";
import { OfficerIdRegisteredValidatorProtocol } from "../../protocols";

interface OfficerIdRegisteredValidatorProps {
  officerRepository: OfficerRepository;
}

export class OfficerIdRegisteredValidator implements OfficerIdRegisteredValidatorProtocol {
  constructor(private readonly props: OfficerIdRegisteredValidatorProps) {}

  validate = async (id: string): Promise<void> => {
    const { officerRepository } = this.props;
    const officer = await officerRepository.findById(id);

    if (!officer) {
      throw new EntityNotFoundError("Oficial");
    }
  };
}
