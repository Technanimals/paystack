import { ChargeService, AuthService, TransactionService } from './services';
export class Paystack {
  public charge: ChargeService;
  public transaction: TransactionService;
  public constructor(config: PaystackConfig) {
    const { clientSecret } = config;
    const authService = new AuthService({ clientSecret });
    this.charge = new ChargeService({
      authService,
    });

    this.transaction = new TransactionService({ authService });
  }
}

export interface PaystackConfig {
  clientSecret: string;
}
