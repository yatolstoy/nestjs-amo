import { DynamicModule, Module, Provider } from '@nestjs/common';
import { AMO_SERVICE_OPTIONS } from './amo.constants';
import { AmoService } from './amo.service';
import { AmoModuleAsyncOptions, AmoModuleOptions } from './interfaces';
import { AmoOptionsFactory } from './interfaces/amo-options-factory.interface';

@Module({
  providers: [AmoService],
  exports: [AmoService],
})
export class AmoModule {
  public static forRoot(options: AmoModuleOptions): DynamicModule {
    return {
      global: options.isGlobal,
      module: AmoModule,
      providers: [
        {
          provide: AMO_SERVICE_OPTIONS,
          useValue: options.amoServiceOptions,
        },
      ],
    };
  }
  public static forRootAsync(options: AmoModuleAsyncOptions): DynamicModule {
    return {
      global: options.isGlobal,
      module: AmoModule,
      imports: options.imports || [],
      providers: this.createAsyncProviders(options),
    };
  }

  private static createAsyncProviders(
    options: AmoModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return this.createAsyncOptionsProvider(options);
    }

    return [
      ...this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: AmoModuleAsyncOptions,
  ): Provider[] {
    if (options.useFactory) {
      return [
        {
          provide: AMO_SERVICE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ];
    }
    return [
      {
        provide: AMO_SERVICE_OPTIONS,
        useFactory: async (optionsFactory: AmoOptionsFactory) =>
          await optionsFactory.createAmoOptions(),
        inject: [options.useExisting || options.useClass],
      },
    ];
  }
}
