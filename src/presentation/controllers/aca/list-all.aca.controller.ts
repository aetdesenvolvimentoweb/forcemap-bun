import { LoggerProtocol } from "../../../application/protocols";
import { ACAOutputDTO } from "../../../domain/dtos";
import { ListAllACAUseCase } from "../../../domain/usecases";
import { HttpResponse } from "../../protocols";
import { ok } from "../../utils";
import { BaseController } from "../base.controller";

interface ListAllACAControllerProps {
  listAllACAService: ListAllACAUseCase;
  logger: LoggerProtocol;
}

export class ListAllACAController extends BaseController {
  constructor(private readonly props: ListAllACAControllerProps) {
    super(props.logger);
  }

  public async handle(): Promise<HttpResponse<ACAOutputDTO[]>> {
    const { listAllACAService } = this.props;

    this.logger.info("Recebida requisição para listar todos os ACAs");

    const result = await this.executeWithErrorHandling(async () => {
      const acas = await listAllACAService.listAll();
      this.logger.info("ACAs listados com sucesso", {
        count: acas.length,
      });
      return ok<ACAOutputDTO[]>(acas);
    }, "Erro ao listar ACAs");

    return result as HttpResponse<ACAOutputDTO[]>;
  }
}
