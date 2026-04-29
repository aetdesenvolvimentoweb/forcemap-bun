import { LoggerProtocol } from "../../../application/protocols";
import { DeleteTelephonistUseCase } from "../../../domain/usecases";
import { HttpRequest, HttpResponse } from "../../protocols";
import { emptyRequest, noContent } from "../../utils";
import { BaseController } from "../base.controller";

interface DeleteTelephonistControllerProps {
  deleteTelephonistService: DeleteTelephonistUseCase;
  logger: LoggerProtocol;
}

export class DeleteTelephonistController extends BaseController {
  constructor(private readonly props: DeleteTelephonistControllerProps) {
    super(props.logger);
  }

  public async handle(request: HttpRequest): Promise<HttpResponse> {
    const { deleteTelephonistService } = this.props;

    this.logger.info("Recebida requisição para deletar telefonista");

    const id = this.validateRequiredParam(request, "id");
    if (!id) {
      return emptyRequest();
    }

    const result = await this.executeWithErrorHandling(
      async () => {
        await deleteTelephonistService.delete(id);
        this.logger.info("Telefonista deletado(a) com sucesso", { id });
        return noContent();
      },
      "Erro ao deletar telefonista",
      { id },
    );

    return result as HttpResponse;
  }
}
