import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { DashboarRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    SharedModule,
    DashboarRoutingModule
  ],
  declarations: [
    ...DashboarRoutingModule.components
  ]
})
export class DashboardModule { }
