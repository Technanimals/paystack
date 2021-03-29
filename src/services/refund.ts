import {
  ServiceConfig,
  PaystackService,
  Currency,
  PageParams,
} from './paystack';

export class RefundService extends PaystackService {
  public constructor(config: ServiceConfig) {
    super(config);
  }
  public create = this.getPostHandler<
    CreateRefundInput,
    CreateRefundResponse
  >();

  public list = (params: Partial<ListRefundParams>) =>
    this.getGetHandler<Record<string, unknown>, ListRefundParams>()({ params });

  public fetch = (data: FetchRefundInput) =>
    this.getGetHandler<FetchRefundInput>(':reference')({ data });
}

interface CreateRefundInput {
  transaction: string;
}
interface CreateRefundResponse {
  dispute: number;
}

export interface ListRefundParams extends PageParams {
  reference: string;
  currency: Currency;
}

export interface FetchRefundInput {
  reference: string;
}
