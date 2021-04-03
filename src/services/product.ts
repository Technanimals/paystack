import {
  ServiceConfig,
  PaystackService,
  Payment,
  Currency,
  PageParams,
} from 'services/paystack';

export class ProductService extends PaystackService {
  public constructor(config: ServiceConfig) {
    super(config);
  }
}
