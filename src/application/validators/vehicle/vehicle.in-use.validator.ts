import { VehicleRepository } from "../../../domain/repositories";
import { ResourceInUseError } from "../../errors";
import { VehicleInUseValidatorProtocol } from "../../protocols";

interface VehicleInUseValidatorProps {
  vehicleRepository: VehicleRepository;
}

export class VehicleInUseValidator implements VehicleInUseValidatorProtocol {
  constructor(private readonly props: VehicleInUseValidatorProps) {}

  validate = async (vehicleId: string): Promise<void> => {
    const { vehicleRepository } = this.props;

    const allVehicles = await vehicleRepository.listAll();
    const isInUse = allVehicles.some((vehicle) => vehicle.id === vehicleId);

    if (isInUse) {
      throw new ResourceInUseError("Viatura", "guarnições");
    }
  };
}
