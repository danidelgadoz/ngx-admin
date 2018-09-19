import { PaymentModule } from './payment.module';

describe('PaymentModule', () => {
  let paymentModule: PaymentModule;

  beforeEach(() => {
    paymentModule = new PaymentModule();
  });

  it('should create an instance', () => {
    expect(paymentModule).toBeTruthy();
  });
});
