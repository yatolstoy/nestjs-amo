import { Injectable, Inject } from '@nestjs/common';
import { AMO_CONNECT_OPTIONS } from './amo.constants';
import { Amo, OAuth } from '@shevernitskiy/amo';
import { AmoConnectOptions } from './interfaces';

interface IAmoService {
  create(amoId: number): Promise<any>;
}

@Injectable()
export class AmoService implements IAmoService {
  private amoAccounts: Record<string, Amo>;

  constructor(
    @Inject(AMO_CONNECT_OPTIONS)
    private readonly amoConnectOptions: AmoConnectOptions,
  ) {
    this.amoAccounts = {};
  }

  async create(amoId): Promise<Amo> {
    if (!!this.amoAccounts[amoId]) return this.amoAccounts[amoId];
    const cred = await this.amoConnectOptions.getCredentials(amoId);
    const amo = new Amo(
      cred.domain,
      {
        ...this.amoConnectOptions.widget_settings,
        ...cred,
        expires_in: cred.expires_in || 86400,
        token_type: cred.token_type || 'Bearer',
      },
      {
        on_token: (token) => this.amoConnectOptions.onTokenUpdate(amoId, token),
        request_delay: this.amoConnectOptions.request_delay,
      },
    );
    this.amoAccounts[amoId] = amo;
    return amo;
  }

  async authByCode(
    code: string,
    referer: string,
    on_token?: (token: OAuth) => void | Promise<void>,
  ): Promise<Amo> {
    const settings = await this.amoConnectOptions.widget_settings;
    const amo = new Amo(
      referer,
      {
        client_id: settings.client_id,
        client_secret: settings.client_secret,
        grant_type: 'authorization_code',
        code,
        redirect_uri: settings.redirect_uri,
      },
      {
        on_token,
      },
    );
    const account = await amo.account.getAccount({ with: ['version'] });
    this.amoAccounts[account.id] = amo;
    return amo;
  }
}
