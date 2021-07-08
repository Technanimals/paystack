import querystring from 'querystring';
import { AuthService } from './auth';
import { RequestMethod } from './http';

export interface ServiceConfig {
  authService: AuthService;
}

export class PaystackService {
  public authService: AuthService;
  public _basePath?: string;
  public constructor(config: ServiceConfig) {
    const { authService } = config;
    this.authService = authService;
  }

  public get basePath() {
    const { name } = this.constructor;
    const { _basePath: basePath } = this;

    return basePath || name.replace('Service', '').toLowerCase();
  }

  public getPath<T>(data: T, resource?: string) {
    const { basePath } = this;
    if (resource) {
      const match = resource.match(/:(\w+)/);
      if (match) {
        const matchKey = match[0];
        const key = match[1] as keyof T;
        const resourceValue = (data[key] as unknown) as string;

        return `${basePath}/${resource}`.replace(matchKey, resourceValue);
      }

      return `${basePath}/${resource}`;
    }

    return basePath;
  }

  public getHandler<T, R = unknown>(method: RequestMethod, resource?: string) {
    return (data?: T) => {
      const path = this.getPath(data, resource);
      const body = method === RequestMethod.GET ? {} : { data };

      return this.authService.makeRequest<T, PaystackResponse<R>>({
        method,
        path,
        ...body,
      });
    };
  }

  public getPostHandler<T, R = unknown>(resource?: string) {
    return (data: T) =>
      this.getHandler<T, R>(RequestMethod.POST, resource)(data);
  }

  public getGetHandler<T, P = unknown, R = unknown>(resource = '') {
    return (input: GetHandlerInput<T, P>) => {
      const { data, params = {} } = input;
      const handlerInput = {
        ...params,
        ...data,
      } as T;
      const queryParams = querystring.stringify(params);
      const requestPath = queryParams ? `${resource}?${queryParams}` : resource;

      return this.getHandler<T, R>(
        RequestMethod.GET,
        requestPath
      )(handlerInput);
    };
  }
}

export interface PaystackMetadata {
  custom_fields: CustomField[];
}

export interface GetHandlerInput<T, P> {
  data?: T;
  params?: Partial<P>;
}
export interface Bank {
  code: string;
  account_number: string;
}

export interface USSD {
  name: string;
}

export interface MobileMoney {
  name: string;
}

export enum Currency {
  AMERICAN_DOLLAR = 'USD',
  SOUTH_AFRICAN_RAND = 'ZAR',
  NIGERIAN_NAIRA = 'NGN',
  GHANAIAN_CEDI = 'GHS',
}
export interface Payment {
  /** */
  amount: number;
  /** */
  email: string;
  /** */
  device_id?: string;
  /** */
  currency?: Currency;
  /** */
  metadata?: PaystackMetadata;
  /** */
  reference?: string;
}
export interface PaymentChannels {
  /** */
  bank?: Bank;
  /** */
  ussd?: USSD;
  /** */
  mobile_money?: MobileMoney;
  /** */
  authorization_code?: string;
}
interface CustomField {
  value: string | number;
  display_name: string;
  variable_name: string;
}

export interface PaystackResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface PageParams {
  perPage: number;
  page: number;
  from: Date;
  to: Date;
}

export type EmptyParams = Record<string, unknown>;
