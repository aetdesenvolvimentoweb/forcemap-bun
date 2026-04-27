import { LoggerProtocol } from "../../../application/protocols";
import { OfficerInputDTO } from "../../../domain/dtos";
import { UpdateOfficerUseCase } from "../../../domain/usecases";
import { HttpRequest, HttpResponse } from "../../protocols";
import { emptyRequest, noContent } from "../../utils";
import { BaseController } from "../base.controller";

interface UpdateOfficerControllerProps {
  updateOfficerService: UpdateOfficerUseCase;
  logger: LoggerProtocol;
}

export class UpdateOfficerController extends BaseController {
  constructor(private readonly props: UpdateOfficerControllerProps) {
    super(props.logger);
  }

  public async handle(
    request: HttpRequest<OfficerInputDTO>,
  ): Promise<HttpResponse> {
    const { updateOfficerService } = this.props;

    this.logger.info("Recebida requisição para atualizar oficial", {
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
        await updateOfficerService.update(id, body);
        this.logger.info("Oficial atualizado com sucesso", {
          id,
          militaryId: body.militaryId,
          workPeriod: body.workPeriod,
          workSchedule: body.workSchedule,
        });
        return noContent();
      },
      "Erro ao atualizar oficial",
      { id, data: body },
    );

    return result as HttpResponse;
  }
}
