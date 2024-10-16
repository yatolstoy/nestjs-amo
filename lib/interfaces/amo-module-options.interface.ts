import {
  ApiError,
  AuthError,
  HttpError,
  NoContentError,
  OAuth,
  OAuthRefresh,
  WebhookError,
} from '@shevernitskiy/amo';

export interface AmoModuleOptions {
  /**
   * If "true", registers `PrismaModule` as a global module.
   * See: https://docs.nestjs.com/modules#global-modules
   */
  isGlobal?: boolean;

  amoServiceOptions: AmoServiceOptions;
}

export interface AmoServiceOptions {
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
  onError?: (
    amoId: number,
    error:
      | Error
      | AuthError
      | ApiError
      | NoContentError
      | HttpError
      | WebhookError,
  ) => void | Promise<void>;
  requestDelay?: number;
  concurrentRequest?: number;
  concurrentTimeframe?: number;
}
