import { HttpClient, defaultHttpClient, RequestMethod } from './http';

export class AuthService {
  private _clientSecret: string;
  private _endpoint: string;
  private _httpClient: HttpClient;
  public constructor(config: AuthConfig) {
    const { clientSecret, httpClient } = config;
    this._clientSecret = clientSecret;
    this._endpoint = 'https://api.paystack.co';
    this._httpClient = httpClient ?? defaultHttpClient;
  }
  /**
   *
   */
  public get clientSecret() {
    return this._clientSecret;
  }
  /**
   *
   */
  public get endpoint() {
    return this._endpoint;
  }
  /**
   *
   */
  public get headers() {
    const { clientSecret } = this;

    return {
      Authorization: `Bearer ${clientSecret}`,
      'Content-Type': 'application/json',
    };
  }

  public getURL(path: string) {
    const { endpoint } = this;

    return `${endpoint}/${path}`;
  }
  public async makeRequest<T, R>(input: AuthRequest<T>) {
    const { method, path, data } = input;
    const { headers } = this;
    const url = this.getURL(path);
    console.log({
      url,
    });
    return this._httpClient.makeRequest<T, R>({
      url,
      headers,
      method,
      data,
    });
  }
}

interface AuthRequest<T> {
  path: string;
  method: RequestMethod;
  data?: T;
}
export interface AuthConfig {
  clientSecret: string;
  httpClient?: HttpClient;
}
