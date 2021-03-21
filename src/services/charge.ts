import { ServiceConfig, PaystackService } from './paystack';

export class ChargeService extends PaystackService {
  public constructor(config: ServiceConfig) {
    super(config);
  }
}
