import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from '../custom-material-module';

import { DashboardComponent } from './dashboard.component';

import { DashboardGuard } from './dashboard.guard';
import { DashboarRoutingModule } from './dashboard.route';

@NgModule({
  imports: [
    CommonModule,
    DashboarRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
  ],
  declarations: [DashboardComponent],
  providers: [
    DashboardGuard
  ]
})
export class DashboardModule { }
