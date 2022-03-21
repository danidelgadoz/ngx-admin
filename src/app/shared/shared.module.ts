import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { FileUploadPreviewComponent } from './components/file-upload-preview/file-upload-preview.component';
import { DndDirective } from './components/file-upload-preview/dnd.directive';
import { ConfirmDialogComponent } from './utils/dialogs/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from './utils/dialogs/alert-dialog/alert-dialog.component';

const COMPONENTS = [
  AlertDialogComponent,
  ConfirmDialogComponent,
  FileUploadPreviewComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    DndDirective,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PerfectScrollbarModule,
    ...COMPONENTS
  ],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
