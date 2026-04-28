import { LoggerProtocol } from "../../../application/protocols";
import { ACAInputDTO } from "../../../domain/dtos";
import { CreateACAUseCase } from "../../../domain/usecases";
import { HttpRequest, HttpResponse } from "../../protocols";
import { created, emptyRequest } from "../../utils";
import { BaseController } from "../base.controller";

interface CreateACAControllerProps {
  createACAService: CreateACAUseCase;
  logger: LoggerProtocol;
}

export class CreateACAController extends BaseController {
  constructor(private readonly props: CreateACAControllerProps) {
    super(props.logger);
  }

  public async handle(
    request: HttpRequest<ACAInputDTO>,
  ): Promise<HttpResponse> {
    const { createACAService } = this.props;

    this.logger.info("Recebida requisição para criar ACA", {
      body: request.body,
    });

    const body = this.validateRequiredBody(request);
    if (!body) {
      return emptyRequest();
    }

    const result = await this.executeWithErrorHandling(
      async () => {
        await createACAService.create(body);
        this.logger.info("ACA criado com sucesso", {
          militaryId: body.militaryId,
          workPeriod: body.workPeriod,
          workSchedule: body.workSchedule,
        });
        return created();
      },
      "Erro ao criar ACA",
      body,
    );

    return result as HttpResponse;
  }
}
