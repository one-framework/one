import { RuntimeException } from './runtime.exception';
import { Type, Provider } from '../../interfaces';
import { Registry } from '../../registry';
import { OneModule } from '../../module';

export class UnknownProviderException extends RuntimeException {
  constructor(provider: Provider, module: Type<OneModule>) {
    const name = Registry.getProviderName(provider);
    super(`${name} could not be found in ${module.name}`);
  }
}
