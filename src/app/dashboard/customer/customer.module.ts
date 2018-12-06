import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer.route';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

@NgModule({
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule
  ],
  declarations: [
    CustomerListComponent,
    CustomerDetailComponent
  ]
})
export class CustomerModule { }
