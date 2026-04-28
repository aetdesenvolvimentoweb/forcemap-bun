import { LoggerProtocol } from "../../../application/protocols";
import { DeleteGarrisonUseCase } from "../../../domain/usecases";
import { HttpRequest, HttpResponse } from "../../protocols";
import { emptyRequest, noContent } from "../../utils";
import { BaseController } from "../base.controller";

interface DeleteGarrisonControllerProps {
  deleteGarrisonService: DeleteGarrisonUseCase;
  logger: LoggerProtocol;
}

export class DeleteGarrisonController extends BaseController {
  constructor(private readonly props: DeleteGarrisonControllerProps) {
    super(props.logger);
  }

  public async handle(request: HttpRequest): Promise<HttpResponse> {
    const { deleteGarrisonService } = this.props;

    this.logger.info("Recebida requisição para deletar guarnição");

    const id = this.validateRequiredParam(request, "id");
    if (!id) {
      return emptyRequest();
    }

    const result = await this.executeWithErrorHandling(
      async () => {
        await deleteGarrisonService.delete(id);
        this.logger.info("Guarnição deletada com sucesso", { id });
        return noContent();
      },
      "Erro ao deletar guarnição",
      { id },
    );

    return result as HttpResponse;
  }
}
