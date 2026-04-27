import { LoggerProtocol } from "../../../application/protocols";
import { OfficerOutputDTO } from "../../../domain/dtos";
import { FindByIdOfficerUseCase } from "../../../domain/usecases";
import { HttpRequest, HttpResponse } from "../../protocols";
import { emptyRequest, ok } from "../../utils";
import { BaseController } from "../base.controller";

interface FindByIdOfficerControllerProps {
  findByIdOfficerService: FindByIdOfficerUseCase;
  logger: LoggerProtocol;
}

export class FindByIdOfficerController extends BaseController {
  constructor(private readonly props: FindByIdOfficerControllerProps) {
    super(props.logger);
  }

  public async handle(
    request: HttpRequest,
  ): Promise<HttpResponse | HttpResponse<OfficerOutputDTO | null>> {
    const { findByIdOfficerService } = this.props;

    this.logger.info("Recebida requisição para listar oficial por ID", {
      params: request.params,
    });

    const id = this.validateRequiredParam(request, "id");
    if (!id) {
      return emptyRequest();
    }

    const result = await this.executeWithErrorHandling(
      async () => {
        const officer = await findByIdOfficerService.findById(id);
        this.logger.info("Oficial encontrado com sucesso", {
          id,
          found: !!officer,
        });
        return ok<OfficerOutputDTO | null>(officer);
      },
      "Erro ao listar oficial",
      { id },
    );

    return result as HttpResponse;
  }
}
