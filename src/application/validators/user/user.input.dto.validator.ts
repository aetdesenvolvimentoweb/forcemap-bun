import { UserInputDTO } from "../../../domain/dtos";
import { UserRole } from "../../../domain/entities";
import {
  MilitaryRepository,
  UserRepository,
} from "../../../domain/repositories";
import {
  IdValidatorProtocol,
  UserBusinessRulesValidatorProtocol,
  UserInputDTOValidatorProtocol,
  UserPasswordValidatorProtocol,
  UserRolePermissionValidatorProtocol,
  UserUniquenessValidatorProtocol,
} from "../../protocols";
import {
  UserBusinessRulesValidator,
  UserPasswordValidator,
  UserRolePermissionValidator,
  UserUniquenessValidator,
} from "./";

interface UserInputDTOValidatorProps {
  userRepository: UserRepository;
  militaryRepository: MilitaryRepository;
  idValidator: IdValidatorProtocol;
}

export class UserInputDTOValidator implements UserInputDTOValidatorProtocol {
  private readonly passwordValidator: UserPasswordValidatorProtocol;
  private readonly rolePermissionValidator: UserRolePermissionValidatorProtocol;
  private readonly businessRulesValidator: UserBusinessRulesValidatorProtocol;
  private readonly uniquenessValidator: UserUniquenessValidatorProtocol;

  constructor(private readonly props: UserInputDTOValidatorProps) {
    this.passwordValidator = new UserPasswordValidator();
    this.rolePermissionValidator = new UserRolePermissionValidator();
    this.businessRulesValidator = new UserBusinessRulesValidator({
      militaryRepository: props.militaryRepository,
      idValidator: props.idValidator,
    });
    this.uniquenessValidator = new UserUniquenessValidator(
      props.userRepository,
    );
  }

  /**
   * Valida para create (idToIgnore não informado) ou update (idToIgnore informado)
   */
  public readonly validate = async (
    data: UserInputDTO,
    requestingUserRole?: UserRole,
    idToIgnore?: string,
  ): Promise<void> => {
    await this.uniquenessValidator.validate(data.militaryId, idToIgnore);
    this.rolePermissionValidator.validate(data.role, requestingUserRole);
    await this.businessRulesValidator.validate(data.militaryId);
    this.passwordValidator.validate(data.password);
  };
}
