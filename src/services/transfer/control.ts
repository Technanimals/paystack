import {
  ServiceConfig,
  PaystackService,
  Payment,
  Currency,
  PageParams,
} from 'services/paystack';

export class TransferControlService extends PaystackService {
  public constructor(config: ServiceConfig) {
    super(config);
    this._basePath = 'balance';
  }
}
