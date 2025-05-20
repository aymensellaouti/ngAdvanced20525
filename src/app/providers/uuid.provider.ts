import { UUIDInjectionToken } from "../tokens/uuid.injection-token";
import {v4 as uuidV4} from 'uuid';
export const UUID_PROVIDER = {
  provide: UUIDInjectionToken,
  useValue: uuidV4
}
