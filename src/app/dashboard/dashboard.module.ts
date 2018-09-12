import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from '../custom-material-module';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';

import { DashboardGuard } from './dashboard.guard';
import { DashboarRoutingModule } from './dashboard.route';

import { SidenavComponent } from '../@core/components/sidenav/sidenav.component';
import { FileInputComponent } from '../@core/components/file-input/file-input.component';
import { DndDirective } from '../@core/components/file-input/dnd.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboarRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
  ],
  declarations: [
    DashboardComponent,
    SidenavComponent,
    FileInputComponent,
    DndDirective
  ],
  providers: [
    DashboardGuard
  ]
})
export class DashboardModule { }
