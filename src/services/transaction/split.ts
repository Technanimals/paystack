import {
  ServiceConfig,
  PaystackService,
  Payment,
  Currency,
  PageParams,
} from '../paystack';

export class TransactionSplitService extends PaystackService {
  public constructor(config: ServiceConfig) {
    super(config);
    this._basePath = 'split';
  }
  public initialize = this.getPostHandler<InitializeInput, InitializeResponse>(
    'initialize'
  );
  public verify = this.getGetHandler<VerifyInput, InitializeResponse>(
    'verify/:reference'
  );

  public list = (params: Partial<ListParams>) =>
    this.getGetHandler<Record<string, unknown>, ListParams>()({ params });

  public fetch = (data: FetchInput) =>
    this.getGetHandler<FetchInput>(':id')({ data });

  public chargeAuthorization = this.getPostHandler<ChargeAuthorizationInput>(
    'charge_authorization'
  );
  public viewTimeline = (data: ViewTimelineInput) =>
    this.getGetHandler<ViewTimelineInput>('timeline/:search')({ data });

  public totals = (params: TotalsInput) =>
    this.getGetHandler<ViewTimelineInput>('totals')({ params });

  public partialDebit = this.getPostHandler<ChargeAuthorizationInput>(
    'charge_authorization'
  );
}

export interface PartialDebitInput {
  authorization_code: string;
  currency: Currency;
  amount: number;
  email: string;
  reference?: string;
  at_least?: number;
}
export interface ViewTimelineInput {
  /** The ID or the reference of the transaction */
  search: string;
}

export type TotalsInput = PageParams;
export interface InitializeInput extends Payment {
  callback_url?: string;
}

export interface FetchInput {
  id: number;
}

export enum TransactionStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
  ABANDONED = 'abandoned',
}

export interface ListParams extends PageParams {
  customer: number;
  status: TransactionStatus;
  amount: number;
}

export interface VerifyInput {
  reference: string;
}

export interface ChargeAuthorizationInput {
  amount: number;
  email: string;
  authorization_code: string;
}
export interface InitializeResponse {
  authorization_url: string;
  access_code: string;
  reference: string;
}
