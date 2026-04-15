import { HttpRequest, HttpResponse } from "./http.protocol";

export interface ControllerProtocol<T = unknown> {
  handle(request: HttpRequest<T>): Promise<HttpResponse | HttpResponse<T>>;
}
