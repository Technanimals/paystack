import {
  ServiceConfig,
  PaystackService,
  PaystackMetadata,
  PaymentChannels,
} from 'services/paystack';

import { BulkChargeService } from './bulk';

export class ChargeService extends PaystackService {
  public bulk: BulkChargeService;
  public constructor(config: ServiceConfig) {
    super(config);
    const { authService } = config;
    this.bulk = new BulkChargeService({ authService });
  }
  public create = this.getPostHandler<CreateInput>();
  public submitPin = this.getPostHandler<SubmitPinInput>('submit_pin');
  public submitOTP = this.getPostHandler<SubmitOTPInput>('submit_otp');
  public submitPhone = this.getPostHandler<SubmitPhoneInput>('submit_phone');
  public submitBirthday = this.getPostHandler<SubmitBirthdayInput>(
    'submit_birthday'
  );
  public submitAddress = this.getPostHandler<SubmitAddressInput>(
    'submit_address'
  );
  public checkPending = this.getPostHandler<CheckPendingInput>(':reference');
}

interface CreateInput extends PaymentChannels {
  /** */
  amount: number;
  /** */
  email: string;
  /** */
  device_id?: string;
  /** */
  metadata?: PaystackMetadata;
  /** */
  reference?: string;
  /** */
  pin?: string;
}

interface BaseChargeInput {
  reference: string;
}
interface SubmitPinInput extends BaseChargeInput {
  pin: string;
}

interface SubmitOTPInput extends BaseChargeInput {
  otp: string;
}

interface SubmitPhoneInput extends BaseChargeInput {
  phone: string;
}

interface SubmitBirthdayInput extends BaseChargeInput {
  birthday: string;
}
interface SubmitAddressInput extends BaseChargeInput {
  address: string;
  city: string;
  state: string;
  zipcode: string;
}

type CheckPendingInput = BaseChargeInput;
