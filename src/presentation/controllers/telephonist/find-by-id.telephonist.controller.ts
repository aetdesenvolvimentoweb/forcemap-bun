import { LoggerProtocol } from "../../../application/protocols";
import { TelephonistOutputDTO } from "../../../domain/dtos";
import { FindByIdTelephonistUseCase } from "../../../domain/usecases";
import { HttpRequest, HttpResponse } from "../../protocols";
import { emptyRequest, ok } from "../../utils";
import { BaseController } from "../base.controller";

interface FindByIdTelephonistControllerProps {
  findByIdTelephonistService: FindByIdTelephonistUseCase;
  logger: LoggerProtocol;
}

export class FindByIdTelephonistController extends BaseController {
  constructor(private readonly props: FindByIdTelephonistControllerProps) {
    super(props.logger);
  }

  public async handle(
    request: HttpRequest,
  ): Promise<HttpResponse | HttpResponse<TelephonistOutputDTO | null>> {
    const { findByIdTelephonistService } = this.props;

    this.logger.info("Recebida requisição para listar telefonista por ID", {
      params: request.params,
    });

    const id = this.validateRequiredParam(request, "id");
    if (!id) {
      return emptyRequest();
    }

    const result = await this.executeWithErrorHandling(
      async () => {
        const telephonist = await findByIdTelephonistService.findById(id);
        this.logger.info("Telefonista encontrado(a) com sucesso", {
          id,
          found: !!telephonist,
        });
        return ok<TelephonistOutputDTO | null>(telephonist);
      },
      "Erro ao listar telefonista",
      { id },
    );

    return result as HttpResponse;
  }
}
