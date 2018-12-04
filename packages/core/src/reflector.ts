import 'reflect-metadata';

import { Type, Provider } from './interfaces';
import { OneModule } from './module';
import {
  SCOPE_METADATA,
  IS_PROVIDER_METADATA,
  IS_MODULE_METADATA,
  SHARED_MODULE_METADATA,
} from './constants';

export class Reflector {
  public static defineByKeys<T = object>(
    metadata: any,
    target: T,
    exclude: string[] = [],
  ): T {
    Object.keys(metadata)
      .filter(p => !exclude.includes(p))
      .forEach(property => {
        Reflect.defineMetadata(property, metadata[property], target);
      });

    return target;
  }

  public static get(metadataKey: string | symbol, target: any) {
    return Reflect.getMetadata(metadataKey, target) || [];
  }

  public static set(
    metadataKey: string | symbol,
    metadataValue: any,
    target: any,
    propertyKey?: string | symbol,
  ) {
    Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey!);
  }

  public static has(metadataKey: string | symbol, target: any) {
    return Reflect.hasMetadata(metadataKey, target);
  }

  public static isGlobalModule(target: any) {
    return this.get(SHARED_MODULE_METADATA, target) === true;
  }

  public static isModule(target: any) {
    return this.get(IS_MODULE_METADATA, target) === true;
  }

  public static isInjectable(target: any) {
    return this.get(IS_PROVIDER_METADATA, target) === true;
  }

  public static getModuleScope(target: Type<OneModule>) {
    const scope = this.get(SHARED_MODULE_METADATA, target);
    return scope ? scope : 'global';
  }

  public static resolveProviderScope(provider: Type<Provider>) {
    return this.get(SCOPE_METADATA, provider);
  }
}
