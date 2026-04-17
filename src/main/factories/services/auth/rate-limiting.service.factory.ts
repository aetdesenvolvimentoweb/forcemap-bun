import { RateLimitingService } from "../../../../application/services";
import { makeSecurityLogger } from "../../logger";
import { makeRateLimiter } from "../../rate-limiter";

export const makeRateLimitingService = (): RateLimitingService => {
  const rateLimiter = makeRateLimiter();
  const securityLogger = makeSecurityLogger();

  return new RateLimitingService({
    rateLimiter,
    securityLogger,
  });
};
