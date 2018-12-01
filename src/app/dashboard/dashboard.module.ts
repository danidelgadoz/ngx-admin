import { NgModule } from '@angular/core';
import { SharedModule } from '../@shared/shared.module';

import { LoaderComponent } from '../@shared/components/loader/loader.component';

import { DashboardComponent } from './dashboard.component';
import { DashboarRoutingModule } from './dashboard.route';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    SharedModule,
    DashboarRoutingModule,
    CustomerModule,
    ProductModule
  ],
  declarations: [
    DashboardComponent,
    LoaderComponent,
    HomeComponent
  ]
})
export class DashboardModule { }
