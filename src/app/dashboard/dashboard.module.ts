import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from '../custom-material-module';

import { DashboardComponent } from './dashboard.component';
import { SidenavComponent } from '../@core/components/sidenav/sidenav.component';

import { DashboardGuard } from './dashboard.guard';
import { DashboarRoutingModule } from './dashboard.route';

import { PaymentModule } from './payment/payment.module';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    PaymentModule,
    DashboarRoutingModule
  ],
  declarations: [
    DashboardComponent,
    SidenavComponent,
    HomeComponent,
    CustomerComponent
  ],
  providers: [
    DashboardGuard
  ]
})
export class DashboardModule { }
