/* Dependencies */
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

/* Interfaces */
import { AmoConnectOptions } from './amo-module-options.interface';
import { AmoOptionsFactory } from './amo-options-factory.interface';

export interface AmoConnectAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<AmoOptionsFactory>;
  useClass?: Type<AmoOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<AmoConnectOptions> | AmoConnectOptions;
}
