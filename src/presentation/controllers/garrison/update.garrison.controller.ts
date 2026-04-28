import { LoggerProtocol } from "../../../application/protocols";
import { GarrisonInputDTO } from "../../../domain/dtos";
import { UpdateGarrisonUseCase } from "../../../domain/usecases";
import { HttpRequest, HttpResponse } from "../../protocols";
import { emptyRequest, noContent } from "../../utils";
import { BaseController } from "../base.controller";

interface UpdateGarrisonControllerProps {
  updateGarrisonService: UpdateGarrisonUseCase;
  logger: LoggerProtocol;
}

export class UpdateGarrisonController extends BaseController {
  constructor(private readonly props: UpdateGarrisonControllerProps) {
    super(props.logger);
  }

  public async handle(
    request: HttpRequest<GarrisonInputDTO>,
  ): Promise<HttpResponse> {
    const { updateGarrisonService } = this.props;

    this.logger.info("Recebida requisição para atualizar guarnição", {
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
        await updateGarrisonService.update(id, body);
        this.logger.info("Guarnição atualizada com sucesso", {
          id,
          vehicleId: body.vehicleId,
          militaryInGarrison: body.militaryInGarrison,
        });
        return noContent();
      },
      "Erro ao atualizar guarnição",
      { id, data: body },
    );

    return result as HttpResponse;
  }
}
