import {
  ServiceConfig,
  PaystackService,
  Payment,
  Currency,
  PageParams,
} from 'services/paystack';

export class ControlPanelService extends PaystackService {
  public constructor(config: ServiceConfig) {
    super(config);
    this._basePath = 'integration';
  }
}
