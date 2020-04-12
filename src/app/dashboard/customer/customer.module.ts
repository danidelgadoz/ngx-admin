import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerService } from './customer.service';

@NgModule({
  declarations: [
    ...CustomerRoutingModule.components
  ],
  imports: [
    CustomerRoutingModule,
    SharedModule
  ],
  providers: [CustomerService]
})
export class CustomerModule { }
