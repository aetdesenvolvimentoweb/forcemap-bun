import { LoggerProtocol } from "../../../application/protocols";
import { OfficerOutputDTO } from "../../../domain/dtos";
import { ListAllOfficerUseCase } from "../../../domain/usecases";
import { HttpResponse } from "../../protocols";
import { ok } from "../../utils";
import { BaseController } from "../base.controller";

interface ListAllOfficerControllerProps {
  listAllOfficerService: ListAllOfficerUseCase;
  logger: LoggerProtocol;
}

export class ListAllOfficerController extends BaseController {
  constructor(private readonly props: ListAllOfficerControllerProps) {
    super(props.logger);
  }

  public async handle(): Promise<HttpResponse<OfficerOutputDTO[]>> {
    const { listAllOfficerService } = this.props;

    this.logger.info("Recebida requisição para listar todos os oficiais");

    const result = await this.executeWithErrorHandling(async () => {
      const officers = await listAllOfficerService.listAll();
      this.logger.info("Oficiais listados com sucesso", {
        count: officers.length,
      });
      return ok<OfficerOutputDTO[]>(officers);
    }, "Erro ao listar oficiais");

    return result as HttpResponse<OfficerOutputDTO[]>;
  }
}
