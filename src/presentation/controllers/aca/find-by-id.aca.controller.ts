import { LoggerProtocol } from "../../../application/protocols";
import { ACAOutputDTO } from "../../../domain/dtos";
import { FindByIdACAUseCase } from "../../../domain/usecases";
import { HttpRequest, HttpResponse } from "../../protocols";
import { emptyRequest, ok } from "../../utils";
import { BaseController } from "../base.controller";

interface FindByIdACAControllerProps {
  findByIdACAService: FindByIdACAUseCase;
  logger: LoggerProtocol;
}

export class FindByIdACAController extends BaseController {
  constructor(private readonly props: FindByIdACAControllerProps) {
    super(props.logger);
  }

  public async handle(
    request: HttpRequest,
  ): Promise<HttpResponse | HttpResponse<ACAOutputDTO | null>> {
    const { findByIdACAService } = this.props;

    this.logger.info("Recebida requisição para listar ACA por ID", {
      params: request.params,
    });

    const id = this.validateRequiredParam(request, "id");
    if (!id) {
      return emptyRequest();
    }

    const result = await this.executeWithErrorHandling(
      async () => {
        const aca = await findByIdACAService.findById(id);
        this.logger.info("ACA encontrado com sucesso", {
          id,
          found: !!aca,
        });
        return ok<ACAOutputDTO | null>(aca);
      },
      "Erro ao listar ACA",
      { id },
    );

    return result as HttpResponse;
  }
}
