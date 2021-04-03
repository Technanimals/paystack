import {
  ServiceConfig,
  PaystackService,
  Payment,
  Currency,
  PageParams,
} from 'services/paystack';

export class SubAccountService extends PaystackService {
  public constructor(config: ServiceConfig) {
    super(config);
    this._basePath = 'dedicated_account';
  }
}
