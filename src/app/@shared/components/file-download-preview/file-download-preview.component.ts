import { Component, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-download-preview',
  templateUrl: './file-download-preview.component.html',
  styleUrls: ['./file-download-preview.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileDownloadPreviewComponent),
      multi: true,
    }
  ],
})
export class FileDownloadPreviewComponent {
  @Output() download: EventEmitter<any[]> = new EventEmitter<any[]>();
  public fileAvailable: any;

  constructor() {}

  public writeValue(initialValue: any) {
    if (initialValue) {
      this.fileAvailable = initialValue;
    }
  }

  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  public registerOnTouched() { }

  private propagateChange = (_: any) => {};

  downloadEvent() {
    this.download.emit();
  }

}
