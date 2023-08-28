<h1 align="center"></h1>

<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
  </a>
</div>

<h3 align="center">NestJS AmoCRM</h3>
<a href="https://www.npmjs.com/package/nestjs-nestjs-amo"><img src="https://img.shields.io/npm/v/nestjs-amo.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/nestjs-amo"><img src="https://img.shields.io/npm/l/nestjs-amo.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/nestjs-amo"><img src="https://img.shields.io/npm/dm/nestjs-amo.svg" alt="NPM Downloads" /></a>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
</div>

### Introduction

This is a simple wrapper of [Amo](https://www.npmjs.com/package/@shevernitskiy/amo) libruary.
With this module you can interacting with the amoCRM/Kommo API from a NestJS application.

### Installation

```bash
yarn add nestjs-amo
```

### Usage

#### Importing module Async

```typescript
import { MailgunModule } from 'nestjs-mailgun';
@Module({
  imports: [
    MailgunModule.forAsyncRoot({
      useFactory: async () => {
        return {	
					widget_settings: {
						client_id: '1111-1111-1111-1111', // From widget settings
						client_secret: 'secret from amoCRM settings', // From widget settings
						redirect_uri: 'https://example.ru', // From widget settings
					},
					getCredentials: (amoId) => {
						// Implement your logic to retrieve a token from your long-term storage facility
						return {
							access_token: 'some token',
							expires_at: 86400,
							expires_in: 1693211983,
							refresh_token: 'saved token',
							domain: 'https://example.ru',
						};
					},
					onTokenUpdate: async (amoId, token) => {
						// Implement your logic for saving authorization keys to long-term storage
						console.log(token);
					},
				};
      },
			imports: [], // Here you can import the desired module to use it in the useFactory function to retrieve or update data from long-term storage
      inject: []
    }),
  ],
  providers: [],
  exports: [],
})
export class YourModule {}
```

#### Calling Send Method

```typescript
import { AmoService } from 'nestjs-amo-api';

@Injectable()
export class YourService {
  constructor(private amoService: AmoService) {}

	async method() {
		const amoApi = await this.amoService.create(123);
    return amoApi.account.getAccount({ with: ['version'] });
	}
}
```

#### Calling Custom endpoint

```typescript
import { AmoService } from 'nestjs-amo-api';

@Injectable()
export class YourService {
  constructor(private amoService: AmoService) {}

	async method() {
		const amoApi = await this.amoService.create(123);
    return amoApi.raw.get({
      url: '/ajax/merge/leads/save',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      payload: 'some payload',
    });
	}
}
```

## Contributing

Contributions welcome! See [Contributing](CONTRIBUTING.md).

## Notes

This project is not endorsed by or affiliated with [AmoCRM](http://www.amocrm.ru).

## Author

**Yaroslav Tolstoy [Site](https://github.com/yatolstoy)**

## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.