import { NgModule } from '@angular/core';
import { SharedModule } from '../@shared/shared.module';

import { DashboardComponent } from './dashboard.component';
import { DashboarRoutingModule } from './dashboard.route';
import { PaymentModule } from './payment/payment.module';
import { HomeComponent } from './home/home.component';

import { LoaderComponent } from '../@shared/components/loader/loader.component';

@NgModule({
  imports: [
    SharedModule,
    PaymentModule,
    DashboarRoutingModule
  ],
  declarations: [
    DashboardComponent,
    LoaderComponent,
    HomeComponent
  ]
})
export class DashboardModule { }
