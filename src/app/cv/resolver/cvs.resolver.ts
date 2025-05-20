import { ResolveFn } from '@angular/router';
import { Cv } from '../model/cv';

export const cvsResolver: ResolveFn<Cv[]> = (route, state) => {
  return [];
};
