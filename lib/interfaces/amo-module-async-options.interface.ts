/* Dependencies */
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

/* Interfaces */
import { AmoServiceOptions } from './amo-module-options.interface';
import { AmoOptionsFactory } from './amo-options-factory.interface';

export interface AmoModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  isGlobal?: boolean;
  inject?: any[];
  useExisting?: Type<AmoOptionsFactory>;
  useClass?: Type<AmoOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<AmoServiceOptions> | AmoServiceOptions;
}
