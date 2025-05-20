import { InjectionToken } from "@angular/core";

export const UUIDInjectionToken = new InjectionToken<() => string>('UUIDInjectionToken');
