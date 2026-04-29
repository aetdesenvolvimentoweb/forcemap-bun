import { LoggerProtocol } from "../../../application/protocols";
import { TelephonistInputDTO } from "../../../domain/dtos";
import { CreateTelephonistUseCase } from "../../../domain/usecases";
import { HttpRequest, HttpResponse } from "../../protocols";
import { created, emptyRequest } from "../../utils";
import { BaseController } from "../base.controller";

interface CreateTelephonistControllerProps {
  createTelephonistService: CreateTelephonistUseCase;
  logger: LoggerProtocol;
}

export class CreateTelephonistController extends BaseController {
  constructor(private readonly props: CreateTelephonistControllerProps) {
    super(props.logger);
  }

  public async handle(
    request: HttpRequest<TelephonistInputDTO>,
  ): Promise<HttpResponse> {
    const { createTelephonistService } = this.props;

    this.logger.info("Recebida requisição para criar telefonista", {
      body: request.body,
    });

    const body = this.validateRequiredBody(request);
    if (!body) {
      return emptyRequest();
    }

    const result = await this.executeWithErrorHandling(
      async () => {
        await createTelephonistService.create(body);
        this.logger.info("Telefonista criado(a) com sucesso", {
          militaryId: body.militaryId,
          workPeriod: body.workPeriod,
          workSchedule: body.workSchedule,
        });
        return created();
      },
      "Erro ao criar telefonista",
      body,
    );

    return result as HttpResponse;
  }
}
