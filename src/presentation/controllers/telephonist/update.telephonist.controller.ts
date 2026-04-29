import { LoggerProtocol } from "../../../application/protocols";
import { TelephonistInputDTO } from "../../../domain/dtos";
import { UpdateTelephonistUseCase } from "../../../domain/usecases";
import { HttpRequest, HttpResponse } from "../../protocols";
import { emptyRequest, noContent } from "../../utils";
import { BaseController } from "../base.controller";

interface UpdateTelephonistControllerProps {
  updateTelephonistService: UpdateTelephonistUseCase;
  logger: LoggerProtocol;
}

export class UpdateTelephonistController extends BaseController {
  constructor(private readonly props: UpdateTelephonistControllerProps) {
    super(props.logger);
  }

  public async handle(
    request: HttpRequest<TelephonistInputDTO>,
  ): Promise<HttpResponse> {
    const { updateTelephonistService } = this.props;

    this.logger.info("Recebida requisição para atualizar telefonista", {
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
        await updateTelephonistService.update(id, body);
        this.logger.info("Telefonista atualizado(a) com sucesso", {
          id,
          militaryId: body.militaryId,
          workPeriod: body.workPeriod,
          workSchedule: body.workSchedule,
        });
        return noContent();
      },
      "Erro ao atualizar telefonista",
      { id, data: body },
    );

    return result as HttpResponse;
  }
}
