import {
  ServiceConfig,
  PaystackService,
  Payment,
  Currency,
  PageParams,
} from 'services/paystack';
import { TransactionSplitService } from './split';

export class TransactionService extends PaystackService {
  public split: TransactionSplitService;
  public constructor(config: ServiceConfig) {
    super(config);
    const { authService } = config;
    this.split = new TransactionSplitService({ authService });
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
  public export = (params: ExportPrams) =>
    this.getGetHandler<ExportPrams>('export')({ params });
  public partialDebit = this.getPostHandler<ChargeAuthorizationInput>(
    'partial_debit'
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

export interface ExportPrams extends ListParams {
  currency: Currency;
  settled: boolean;
  settlement: number;
  payment_page: number;
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
