import {
  LoggerProtocol,
  SecurityLoggerProtocol,
} from "../../application/protocols";
import {
  LogLevelSecurityLogger,
  SecurityEventSeverity,
  SecurityEventType,
} from "./middlewares";

/**
 * Adapter que implementa SecurityLoggerProtocol usando LogLevelSecurityLogger.
 * Permite que a camada de aplicação não dependa diretamente da infraestrutura.
 */
export class SecurityLoggerAdapter implements SecurityLoggerProtocol {
  private readonly securityLogger: LogLevelSecurityLogger;

  constructor(logger: LoggerProtocol) {
    this.securityLogger = new LogLevelSecurityLogger(logger);
  }

  public logLogin(
    success: boolean,
    userId: string,
    sessionId?: string,
    metadata?: Record<string, unknown>,
  ): void {
    this.securityLogger.logLoginAttempt(success, userId, undefined, {
      ...metadata,
      sessionId,
    });
  }

  public logLoginBlocked(
    identifier: string,
    sessionId: string | undefined,
    reason: string,
  ): void {
    this.securityLogger.logSecurityEvent({
      timestamp: new Date().toISOString(),
      eventType: SecurityEventType.LOGIN_BLOCKED,
      severity: SecurityEventSeverity.HIGH,
      message: `Login bloqueado para ${identifier}: ${reason}`,
      additionalData: { identifier, reason, sessionId },
    });
  }

  public logLogout(userId: string, sessionId?: string, reason?: string): void {
    this.securityLogger.logSecurityEvent({
      timestamp: new Date().toISOString(),
      eventType: SecurityEventType.LOGOUT,
      severity: SecurityEventSeverity.LOW,
      message: `Logout realizado para usuário ${userId}${reason ? `: ${reason}` : ""}`,
      userId,
      additionalData: { sessionId, reason },
    });
  }

  public logTokenRefresh(
    userId: string,
    sessionId?: string,
    metadata?: Record<string, unknown>,
  ): void {
    this.securityLogger.logSecurityEvent({
      timestamp: new Date().toISOString(),
      eventType: SecurityEventType.TOKEN_REFRESH,
      severity: SecurityEventSeverity.LOW,
      message: `Token refreshed para usuário ${userId}`,
      userId,
      additionalData: { ...metadata, sessionId },
    });
  }

  public logAccessDenied(
    userId: string,
    resource: string,
    reason: string,
    metadata?: Record<string, unknown>,
  ): void {
    this.securityLogger.logAccessDenied(userId, resource, undefined);
  }

  public logSuspiciousActivity(
    identifier: string,
    activityType: string,
    details: Record<string, unknown>,
  ): void {
    this.securityLogger.logSuspiciousActivity(
      `${activityType}: ${identifier}`,
      undefined,
      details,
    );
  }
}
