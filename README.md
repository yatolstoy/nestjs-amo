<h1 align="center"></h1>

<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
  </a>
</div>

<h3 align="center">nestjs-amo</h3>
<a href="https://www.npmjs.com/package/nestjs-nestjs-amo"><img src="https://img.shields.io/npm/v/nestjs-amo.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/nestjs-amo"><img src="https://img.shields.io/npm/l/nestjs-amo.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/nestjs-amo"><img src="https://img.shields.io/npm/dm/nestjs-amo.svg" alt="NPM Downloads" /></a>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
</div>

### Introduction

This is a simple wrapper of
[@shevernitskiy/amo](https://www.npmjs.com/package/@shevernitskiy/amo) library.
With this module you can interact with the amoCRM/Kommo API from a NestJS
application.

### Installation

```bash
# npm
npm install nestjs-amo

# yarn
yarn add nestjs-amo
```

Furthermore, install
[@shevernitskiy/amo](https://www.npmjs.com/package/@shevernitskiy/amo) in your
NestJS application, if you haven't already.

```sh
# npm
npm install @shevernitskiy/amo

# yarn
yarn add @shevernitskiy/amo
```

### Usage

Add `AmoModule` to the `imports` section in your `AppModule` or other modules to
gain access to `AmoService`.

#### Static import

```ts
import { Module } from "@nestjs/common";
import { AmoModule } from "nestjs-amo";

@Module({
	imports: [
		AmoModule.forRoot({
			isGlobal: true,
			amoServiceOptions: {},
		}),
	],
})
export class AppModule {}
```

Additionally, `AmoModule` provides a `forRootAsync` to pass options
asynchronously.

#### Async configuration

```ts
import { Module } from "@nestjs/common";
import { AmoModule } from "nestjs-amo";

@Module({
	imports: [
		AmoModule.forRootAync({
			isGlobal: true,
			useFactory: async () => {
				return {
					widget_settings: {
						client_id: "1111-2222-3333",
						client_secret: "myclientsecret",
						redirect_uri: "https://myredirect.org",
					},
					getCredentials: (amoId) => {
						// Implement your logic to retrieve a token from your long-term storage facility
					},
					onTokenUpdate: async (amoId, token) => {
						// Implement your logic for saving authorization keys to long-term storage
						console.log("New token obtained", amoId, token);
					},
				};
			},
		}),
	],
})
export class AppModule {}
```

You can inject dependencies such as `ConfigModule` to load options from .env
files.

```ts
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AmoModule } from "nestjs-amo";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		AmoModule.forRootAync({
			isGlobal: true,
			useFactory: async (configService: ConfigService) => {
				return {
					widget_settings: {
						client_id: configService.get("AMO_CLIENT_ID"),
						client_secret: configService.get("AMO_CLIENT_SECRET"),
						redirect_uri: configService.get("AMO_REDIRECT_URI"),
					},
					getCredentials: (amoId) => {
						// Implement your logic to retrieve a token from your long-term storage facility
					},
					onTokenUpdate: async (amoId, token) => {
						// Implement your logic for saving authorization keys to long-term storage
						console.log("New token obtained", amoId, token);
					},
				};
			},
			inject: [ConfigService],
		}),
	],
})
export class AppModule {}
```

#### Calling send method

```typescript
import { AmoService } from "nestjs-amo";

@Injectable()
export class YourService {
	constructor(private amoService: AmoService) {}

	async method() {
		const amoApi = await this.amoService.create(123);
		return amoApi.account.getAccount({ with: ["version"] });
	}
}
```

#### Calling custom endpoint

```typescript
import { AmoService } from "nestjs-amo";

@Injectable()
export class YourService {
	constructor(private amoService: AmoService) {}

	async method() {
		const amoApi = await this.amoService.create(123);
		return amoApi.raw.get({
			url: "/ajax/merge/leads/save",
			headers: {
				"X-Requested-With": "XMLHttpRequest",
			},
			payload: "some payload",
		});
	}
}
```

## Contributing

Contributions welcome! See [Contributing](CONTRIBUTING.md).

## Notes

This project is not endorsed by or affiliated with
[AmoCRM](http://www.amocrm.ru).

## Author

**Yaroslav Tolstoy - [GitHub](https://github.com/yatolstoy)**

## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
