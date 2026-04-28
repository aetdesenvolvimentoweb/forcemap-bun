import { LoggerProtocol } from "../../../application/protocols";
import { ACAInputDTO } from "../../../domain/dtos";
import { UpdateACAUseCase } from "../../../domain/usecases";
import { HttpRequest, HttpResponse } from "../../protocols";
import { emptyRequest, noContent } from "../../utils";
import { BaseController } from "../base.controller";

interface UpdateACAControllerProps {
  updateACAService: UpdateACAUseCase;
  logger: LoggerProtocol;
}

export class UpdateACAController extends BaseController {
  constructor(private readonly props: UpdateACAControllerProps) {
    super(props.logger);
  }

  public async handle(
    request: HttpRequest<ACAInputDTO>,
  ): Promise<HttpResponse> {
    const { updateACAService } = this.props;

    this.logger.info("Recebida requisição para atualizar ACA", {
      params: request.params,
      body: request.body,
    });

    const id = this.validateRequiredParam(request, "id");
    if (!id) {
      return emptyRequest();
    }

    const body = this.validateRequiredBody(request);
    if (!body) {
      return emptyRequest();
    }

    const result = await this.executeWithErrorHandling(
      async () => {
        await updateACAService.update(id, body);
        this.logger.info("ACA atualizado com sucesso", {
          id,
          militaryId: body.militaryId,
          workPeriod: body.workPeriod,
          workSchedule: body.workSchedule,
        });
        return noContent();
      },
      "Erro ao atualizar ACA",
      { id, data: body },
    );

    return result as HttpResponse;
  }
}
