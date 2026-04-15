import type { Context } from "hono";

import type { LoggerProtocol } from "../../application/protocols";
import type {
  ControllerProtocol,
  HttpRequest,
  HttpResponse,
} from "../../presentation/protocols";

export const honoRouteAdapter = (
  controller: ControllerProtocol,
  logger: LoggerProtocol,
) => {
  return async (c: Context): Promise<Response> => {
    try {
      const body = await c.req.json().catch(() => undefined);
      const httpRequest: HttpRequest = {
        body,
        params: c.req.param(),
        query: c.req.query(),
        headers: c.req.header(),
        ip:
          c.req.header("CF-Connecting-IP") ||
          c.req.header("X-Forwarded-For") ||
          c.req.header("X-Real-IP") ||
          c.req.header("x-forwarded-for") ||
          c.req.header("x-real-ip") ||
          undefined,
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        user: (c.req as any).user,
      };

      const httpResponse: HttpResponse = await controller.handle(httpRequest);

      const response = c.json(
        httpResponse.body ?? {},
        httpResponse.statusCode as any,
      );

      if (httpResponse.headers && typeof httpResponse.headers === "object") {
        Object.entries(httpResponse.headers as Record<string, unknown>).forEach(
          ([key, value]) => {
            response.headers.set(key, String(value));
          },
        );
      }

      return response;
    } catch (error) {
      logger.error("Hono route adapter error", {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
        path: c.req.url,
        method: c.req.method,
      });
      return c.json({ error: "Internal server error" }, 500);
    }
  };
};
