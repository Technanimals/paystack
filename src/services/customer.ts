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
}
interface FetchResponse {
  authorizations: Authorization[];
}
