import { AmoServiceOptions } from './amo-module-options.interface';

export interface AmoOptionsFactory {
  createAmoOptions(): Promise<AmoServiceOptions> | AmoServiceOptions;
}
