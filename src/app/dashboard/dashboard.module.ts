import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { DashboarRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutModule } from './layouts/layouts.module';

@NgModule({
  imports: [
    SharedModule,
    DashboardLayoutModule,
    DashboarRoutingModule
  ],
  declarations: [
    ...DashboarRoutingModule.components
  ]
})
export class DashboardModule { }
