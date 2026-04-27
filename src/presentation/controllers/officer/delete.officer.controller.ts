import { LoggerProtocol } from "../../../application/protocols";
import { UserRole } from "../../../domain/entities";
import { DeleteOfficerUseCase } from "../../../domain/usecases";
import { HttpRequest, HttpResponse } from "../../protocols";
import { emptyRequest, noContent } from "../../utils";
import { BaseController } from "../base.controller";

interface DeleteOfficerControllerProps {
  deleteOfficerService: DeleteOfficerUseCase;
  logger: LoggerProtocol;
}

export class DeleteOfficerController extends BaseController {
  constructor(private readonly props: DeleteOfficerControllerProps) {
    super(props.logger);
  }

  public async handle(request: HttpRequest): Promise<HttpResponse> {
    const { deleteOfficerService } = this.props;

    this.logger.info("Recebida requisição para deletar oficial");

    const id = this.validateRequiredParam(request, "id");
    if (!id) {
      return emptyRequest();
    }

    const requestingUserRole = request.user?.role as UserRole;

    const result = await this.executeWithErrorHandling(
      async () => {
        await deleteOfficerService.delete(id);
        this.logger.info("Oficial deletado com sucesso", { id });
        return noContent();
      },
      "Erro ao deletar oficial",
      { id },
    );

    return result as HttpResponse;
  }
}
