import {
  ServiceConfig,
  PaystackService,
  Payment,
  Currency,
  PageParams,
} from 'services/paystack';

export class InvoiceService extends PaystackService {
  public constructor(config: ServiceConfig) {
    super(config);
  }
}
