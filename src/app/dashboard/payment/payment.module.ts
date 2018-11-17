import { NgModule } from '@angular/core';
import { SharedModule } from '../../@shared/shared.module';

import { PaymentListComponent } from './payment-list/payment-list.component';
import { PaymentResumeComponent } from './payment-resume/payment-resume.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    PaymentListComponent,
    PaymentResumeComponent
  ]
})
export class PaymentModule { }
