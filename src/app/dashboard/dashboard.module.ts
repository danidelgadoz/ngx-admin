import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard.component';
import { DashboarRoutingModule } from './dashboard.route';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    SharedModule,
    DashboarRoutingModule
  ],
  declarations: [
    DashboardComponent,
    HomeComponent
  ]
})
export class DashboardModule { }
