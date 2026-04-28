import { LoggerProtocol } from "../../../application/protocols";
import { GarrisonInputDTO } from "../../../domain/dtos";
import { CreateGarrisonUseCase } from "../../../domain/usecases";
import { HttpRequest, HttpResponse } from "../../protocols";
import { created, emptyRequest } from "../../utils";
import { BaseController } from "../base.controller";

interface CreateGarrisonControllerProps {
  createGarrisonService: CreateGarrisonUseCase;
  logger: LoggerProtocol;
}

export class CreateGarrisonController extends BaseController {
  constructor(private readonly props: CreateGarrisonControllerProps) {
    super(props.logger);
  }

  public async handle(
    request: HttpRequest<GarrisonInputDTO>,
  ): Promise<HttpResponse> {
    const { createGarrisonService } = this.props;

    this.logger.info("Recebida requisição para criar guarnição", {
      body: request.body,
    });

    const body = this.validateRequiredBody(request);
    if (!body) {
      return emptyRequest();
    }

    const result = await this.executeWithErrorHandling(
      async () => {
        await createGarrisonService.create(body);
        this.logger.info("Guarnição criada com sucesso", {
          vehicleId: body.vehicleId,
          militaryInGarrison: body.militaryInGarrison,
        });
        return created();
      },
      "Erro ao criar guarnição",
      body,
    );

    return result as HttpResponse;
  }
}
