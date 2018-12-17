import { multiInject } from 'inversify';

import { MissingInjectionTokenException } from '../errors';
import { InjectionToken } from '../module';
import { Registry } from '../registry';

export function MultiInject<T>(token: InjectionToken<T>) {
  return (target: object, propertyKey: string, index?: number) => {
    if (!Registry.isInjectionToken(token)) {
      throw new MissingInjectionTokenException('@MultiInject()');
    }

    multiInject(token.name)(target, propertyKey, index);
  };
}
