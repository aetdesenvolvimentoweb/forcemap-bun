import { LoggerProtocol } from "../../../application/protocols";
import { GarrisonOutputDTO } from "../../../domain/dtos";
import { FindByIdGarrisonUseCase } from "../../../domain/usecases";
import { HttpRequest, HttpResponse } from "../../protocols";
import { emptyRequest, ok } from "../../utils";
import { BaseController } from "../base.controller";

interface FindByIdGarrisonControllerProps {
  findByIdGarrisonService: FindByIdGarrisonUseCase;
  logger: LoggerProtocol;
}

export class FindByIdGarrisonController extends BaseController {
  constructor(private readonly props: FindByIdGarrisonControllerProps) {
    super(props.logger);
  }

  public async handle(
    request: HttpRequest,
  ): Promise<HttpResponse | HttpResponse<GarrisonOutputDTO | null>> {
    const { findByIdGarrisonService } = this.props;

    this.logger.info("Recebida requisição para listar guarnição por ID", {
      params: request.params,
    });

    const id = this.validateRequiredParam(request, "id");
    if (!id) {
      return emptyRequest();
    }

    const result = await this.executeWithErrorHandling(
      async () => {
        const garrison = await findByIdGarrisonService.findById(id);
        this.logger.info("Guarnição encontrada com sucesso", {
          id,
          found: !!garrison,
        });
        return ok<GarrisonOutputDTO | null>(garrison);
      },
      "Erro ao listar guarnição",
      { id },
    );

    return result as HttpResponse;
  }
}
