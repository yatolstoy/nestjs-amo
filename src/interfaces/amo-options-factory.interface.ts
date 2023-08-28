import { AmoConnectOptions } from './amo-module-options.interface';

export interface AmoOptionsFactory {
  createAmoConnectOptions(): Promise<AmoConnectOptions> | AmoConnectOptions;
}
