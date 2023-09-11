import { OAuth, OAuthRefresh } from '@shevernitskiy/amo';

export interface AmoConnectOptions {
  widget_settings: Pick<
    OAuthRefresh,
    'client_id' | 'client_secret' | 'redirect_uri'
  >;
  getCredentials: (amoId: number) => Promise<
    Pick<OAuth, Exclude<keyof OAuth, 'token_type' | 'expires_in'>> &
      Partial<Pick<OAuth, 'token_type' | 'expires_in'>> & {
        domain: string;
      }
  >;
  onTokenUpdate: (amoId: number, token: OAuth) => void | Promise<void>;
  request_delay?: number;
}
