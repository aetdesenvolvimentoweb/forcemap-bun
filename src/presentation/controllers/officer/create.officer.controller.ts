import { LoggerProtocol } from "../../../application/protocols";
import { OfficerInputDTO } from "../../../domain/dtos";
import { CreateOfficerUseCase } from "../../../domain/usecases";
import { HttpRequest, HttpResponse } from "../../protocols";
import { created, emptyRequest } from "../../utils";
import { BaseController } from "../base.controller";

interface CreateOfficerControllerProps {
  createOfficerService: CreateOfficerUseCase;
  logger: LoggerProtocol;
}

export class CreateOfficerController extends BaseController {
  constructor(private readonly props: CreateOfficerControllerProps) {
    super(props.logger);
  }

  public async handle(
    request: HttpRequest<OfficerInputDTO>,
  ): Promise<HttpResponse> {
    const { createOfficerService } = this.props;

    this.logger.info("Recebida requisição para criar oficial", {
      body: request.body,
    });

    const body = this.validateRequiredBody(request);
    if (!body) {
      return emptyRequest();
    }

    const result = await this.executeWithErrorHandling(
      async () => {
        await createOfficerService.create(body);
        this.logger.info("Oficial criado com sucesso", {
          militaryId: body.militaryId,
          workPeriod: body.workPeriod,
          workSchedule: body.workSchedule,
        });
        return created();
      },
      "Erro ao criar oficial",
      body,
    );

    return result as HttpResponse;
  }
}
