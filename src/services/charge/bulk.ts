import { ServiceConfig, PaystackService, PageParams } from 'services/paystack';

export class BulkChargeService extends PaystackService {
  public constructor(config: ServiceConfig) {
    super(config);
  }
  public initiate = this.getPostHandler<InitiateBulkChargeInput[]>();
  public list = (data: ListBulkChargeParams) =>
    this.getGetHandler<ListBulkChargeParams>(':search')({
      data,
    });
  public fetch = (input: FetchBulkChargeInput) => {
    const { search, ...params } = input;
    return this.getGetHandler<Record<string, unknown>, FetchBulkChargeInput>(
      ':search/charges'
    )({
      params,
      data: { search },
    });
  };
  public pause = (data: PauseBulkChargeParams) =>
    this.getGetHandler<PauseBulkChargeParams>('pause/:batchCode')({
      data,
    });

  public resume = (data: ResumeBulkChargeParams) =>
    this.getGetHandler<ResumeBulkChargeParams>('resume/:batchCode')({
      data,
    });
}

interface InitiateBulkChargeInput {
  authorization: string;
  amount: number;
}

interface PauseBulkChargeParams {
  batchCode: string;
}

type ResumeBulkChargeParams = PauseBulkChargeParams;

interface ListBulkChargeParams {
  search: string;
}

interface FetchBulkChargeParams {
  search: string;
}

enum ChargeStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
  PENDING = 'pending',
}
interface FetchBulkChargeInput
  extends FetchBulkChargeParams,
    Partial<PageParams> {
  status: ChargeStatus;
}
