import {
  ChargeService,
  AuthService,
  TransactionService,
  RefundService,
} from './services';
export class Paystack {
  public charge: ChargeService;
  public transaction: TransactionService;
  public refund: RefundService;
  public constructor(config: PaystackConfig) {
    const { clientSecret } = config;
    const authService = new AuthService({ clientSecret });
    this.charge = new ChargeService({
      authService,
    });
    this.transaction = new TransactionService({ authService });
    this.refund = new RefundService({ authService });
  }
}

export interface PaystackConfig {
  clientSecret: string;
}
