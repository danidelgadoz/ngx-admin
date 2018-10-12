import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FileInputComponent } from '../../@core/components/file-input/file-input.component';
import { DndDirective } from '../../@core/components/file-input/dnd.directive';

import { MaterialModule } from '../../material.module';

import { PaymentUploadComponent } from './payment-upload/payment-upload.component';
import { PaymentListComponent } from './payment-list/payment-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
  ],
  declarations: [
    PaymentUploadComponent,
    PaymentListComponent,
    FileInputComponent,
    DndDirective
  ]
})
export class PaymentModule { }
