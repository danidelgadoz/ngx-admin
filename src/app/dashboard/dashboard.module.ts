import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DashboardComponent } from './dashboard.component';
import { SidenavComponent } from '../@core/components/sidenav/sidenav.component';
import { LoaderComponent } from '../@core/components/loader/loader.component';

import { MaterialModule } from '../material.module';
import { DashboarRoutingModule } from './dashboard.route';
import { PaymentModule } from './payment/payment.module';

import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    PaymentModule,
    DashboarRoutingModule
  ],
  declarations: [
    DashboardComponent,
    SidenavComponent,
    LoaderComponent,
    HomeComponent,
    CustomerComponent
  ]
})
export class DashboardModule { }
