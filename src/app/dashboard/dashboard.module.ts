import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { LoaderComponent } from '../shared/components/loader/loader.component';

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
    LoaderComponent,
    HomeComponent
  ]
})
export class DashboardModule { }
