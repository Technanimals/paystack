import { AuthService } from './auth';

export interface ServiceConfig {
  authService: AuthService;
}

export class PaystackService {
  private _authService: AuthService;
  public constructor(config: ServiceConfig) {
    const { authService } = config;
    this._authService = authService;
  }
}
