import { ChargeService, AuthService } from './services';
export class Paystack {
  public charge: ChargeService;
  public constructor(config: PayStackConfig) {
    const { clientSecret } = config;
    const authService = new AuthService({ clientSecret });
    this.charge = new ChargeService({
      authService,
    });
  }
}

export interface PayStackConfig {
  clientSecret: string;
}
