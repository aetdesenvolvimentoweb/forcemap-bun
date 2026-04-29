import { LoggerProtocol } from "../../../application/protocols";
import { TelephonistOutputDTO } from "../../../domain/dtos";
import { ListAllTelephonistUseCase } from "../../../domain/usecases";
import { HttpResponse } from "../../protocols";
import { ok } from "../../utils";
import { BaseController } from "../base.controller";

interface ListAllTelephonistControllerProps {
  listAllTelephonistService: ListAllTelephonistUseCase;
  logger: LoggerProtocol;
}

export class ListAllTelephonistController extends BaseController {
  constructor(private readonly props: ListAllTelephonistControllerProps) {
    super(props.logger);
  }

  public async handle(): Promise<HttpResponse<TelephonistOutputDTO[]>> {
    const { listAllTelephonistService } = this.props;

    this.logger.info("Recebida requisição para listar todos os telefonistas");

    const result = await this.executeWithErrorHandling(async () => {
      const telephonists = await listAllTelephonistService.listAll();
      this.logger.info("Telefonistas listados com sucesso", {
        count: telephonists.length,
      });
      return ok<TelephonistOutputDTO[]>(telephonists);
    }, "Erro ao listar telefonistas");

    return result as HttpResponse<TelephonistOutputDTO[]>;
  }
}
