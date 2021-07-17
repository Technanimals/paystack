import { ServiceConfig, PaystackService, EmptyParams } from 'services/paystack';

export class CustomerService extends PaystackService {
  public constructor(config: ServiceConfig) {
    super(config);
  }

  public fetch = (data: FetchInput) =>
    this.getGetHandler<FetchInput, EmptyParams, FetchResponse>(':search')({
      data,
    });
}

interface FetchInput {
  search: string;
}

interface Authorization {
  authorization_code: string;
  bin: string;
  last4: string;
  exp_month: string;
  exp_year: string;
  channel: string;
  card_type: string;
  bank: string;
  country_code: string;
  brand: string;
  reusable: boolean;
  signature: string;
}
interface FetchResponse {
  authorizations: Authorization[];
}
