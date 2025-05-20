import { InjectionToken } from "@angular/core";
import { LoggerService } from "../services/logger.service";

export const LoggersInjectionToken = new InjectionToken<LoggerService[]>('LoggersInjectionToken');
