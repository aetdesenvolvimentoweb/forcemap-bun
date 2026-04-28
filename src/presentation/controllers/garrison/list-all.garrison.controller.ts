import { LoggerProtocol } from "../../../application/protocols";
import { GarrisonOutputDTO } from "../../../domain/dtos";
import { ListAllGarrisonUseCase } from "../../../domain/usecases";
import { HttpResponse } from "../../protocols";
import { ok } from "../../utils";
import { BaseController } from "../base.controller";

interface ListAllGarrisonControllerProps {
  listAllGarrisonService: ListAllGarrisonUseCase;
  logger: LoggerProtocol;
}

export class ListAllGarrisonController extends BaseController {
  constructor(private readonly props: ListAllGarrisonControllerProps) {
    super(props.logger);
  }

  public async handle(): Promise<HttpResponse<GarrisonOutputDTO[]>> {
    const { listAllGarrisonService } = this.props;

    this.logger.info("Recebida requisição para listar todas as guarnições");

    const result = await this.executeWithErrorHandling(async () => {
      const garrisons = await listAllGarrisonService.listAll();
      this.logger.info("Guarnições listadas com sucesso", {
        count: garrisons.length,
      });
      return ok<GarrisonOutputDTO[]>(garrisons);
    }, "Erro ao listar guarnições");

    return result as HttpResponse<GarrisonOutputDTO[]>;
  }
}
