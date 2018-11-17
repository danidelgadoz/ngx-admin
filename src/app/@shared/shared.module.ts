import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FileDownloadPreviewComponent } from './components/file-download-preview/file-download-preview.component';
import { FileUploadPreviewComponent } from './components/file-upload-preview/file-upload-preview.component';
import { DndDirective } from './components/file-upload-preview/dnd.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SidenavComponent,
    FileDownloadPreviewComponent,
    FileUploadPreviewComponent
  ],
  declarations: [
    SidenavComponent,
    FileDownloadPreviewComponent,
    FileUploadPreviewComponent,
    DndDirective,
  ]
})
export class SharedModule { }
