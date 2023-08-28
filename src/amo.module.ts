import { Module, DynamicModule, Global, Provider } from '@nestjs/common';
import { AmoService } from './amo.service';
import { AmoConnectOptions } from './interfaces/amo-module-options.interface';
import { AMO_CONNECT_OPTIONS } from './amo.constants';
import { AmoConnectAsyncOptions } from './interfaces/amo-module-async-options.interface';
import { AmoOptionsFactory } from './interfaces/amo-options-factory.interface';

@Global()
@Module({})
export class AmoModule {
  public static forRoot(connectOptions: AmoConnectOptions): DynamicModule {
    return {
      module: AmoModule,
      providers: [
        {
          provide: AMO_CONNECT_OPTIONS,
          useValue: connectOptions,
        },
        AmoService,
      ],
      exports: [AmoService],
    };
  }
  public static forRootAsync(
    connectOptions: AmoConnectAsyncOptions,
  ): DynamicModule {
    return {
      module: AmoModule,
      imports: connectOptions.imports || [],
      providers: [this.createConnectAsyncProviders(connectOptions), AmoService],
      exports: [AmoService],
    };
  }

  private static createConnectAsyncProviders(
    options: AmoConnectAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: AMO_CONNECT_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    // For useClass and useExisting...
    return {
      provide: AMO_CONNECT_OPTIONS,
      useFactory: async (optionsFactory: AmoOptionsFactory) =>
        await optionsFactory.createAmoConnectOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
