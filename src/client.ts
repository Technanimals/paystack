/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ChargeService,
  ControlPanelService,
  CustomerService,
  DisputeService,
  InvoiceService,
  MiscellaneousService,
  NubanService,
  PaymentPageService,
  PlanService,
  ProductService,
  RefundService,
  SettlementService,
  SubAccountService,
  SubscriptionService,
  TransactionService,
  TransferService,
  VerificationService,
} from 'services';

import { AuthService } from 'services/auth';

export interface PaystackConfig {
  clientSecret: string;
}

const services = {
  charge: ChargeService,
  controlPanel: ControlPanelService,
  customer: CustomerService,
  dispute: DisputeService,
  invoice: InvoiceService,
  miscellaneous: MiscellaneousService,
  nuban: NubanService,
  paymentPage: PaymentPageService,
  plan: PlanService,
  product: ProductService,
  refund: RefundService,
  settlement: SettlementService,
  subAccount: SubAccountService,
  subscription: SubscriptionService,
  transaction: TransactionService,
  transfer: TransferService,
  verification: VerificationService,
};

export interface PaystackClient {
  charge: ChargeService;
  controlPanel: ControlPanelService;
  customer: CustomerService;
  dispute: DisputeService;
  invoice: InvoiceService;
  miscellaneous: MiscellaneousService;
  nuban: NubanService;
  paymentPage: PaymentPageService;
  plan: PlanService;
  product: ProductService;
  refund: RefundService;
  settlement: SettlementService;
  subAccount: SubAccountService;
  subscription: SubscriptionService;
  transaction: TransactionService;
  transfer: TransferService;
  verification: VerificationService;
}
export function createClient(config: PaystackConfig) {
  const { clientSecret } = config;
  const authService = new AuthService({ clientSecret });

  const keys = Object.keys(services);

  return keys.reduce((memo, key) => {
    // @ts-ignore
    const Service = services[key];

    return {
      ...memo,
      [key]: new Service({
        authService,
      }),
    };
  }, {}) as PaystackClient;
}
