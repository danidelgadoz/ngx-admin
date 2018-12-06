import { Component, Output, Input, forwardRef, EventEmitter  } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-file-upload-preview',
  templateUrl: './file-upload-preview.component.html',
  styleUrls: ['./file-upload-preview.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadPreviewComponent),
      multi: true,
    }
  ],
})
export class FileUploadPreviewComponent implements ControlValueAccessor {
  @Output() upload: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() submit: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Input() submited: Boolean;

  fileToTransfer: any;
  public thumbnail: string;

  constructor(private sanitizer: DomSanitizer) {}

  public writeValue(initialValue: any) { }

  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  public registerOnTouched() { }

  private propagateChange = (_: any) => {};

  public addToGallery(event) {
    let fileList: FileList;

    if (event.target.files && event.target.files.length > 0) { // when is loaded by fileUploadPopup
      fileList = event.target.files;
    } else if ( event.dataTransfer) { // when is loaded by dragAndDrop
      fileList = event.dataTransfer.files;
    }

    if (fileList.length === 0) {
      return;
    }

    const reader = new FileReader();
    reader.onload = ((_file, _this) => {
      return (e) => {
        _this.fileToTransfer = _file;
        _this.propagateChange(_file);
        _this.upload.emit();
      };
    })(fileList[0], this); // callback when the images have been loaded
    reader.readAsDataURL(fileList[0]);
    this.thumbnail = this.getImagePreview(fileList[0]);
  }

  private getImagePreview(file) {
    let thumbnail: any;

    if (file.type.includes('image')) {
      thumbnail = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));

    } else if (file.type.includes('sheet')) {
      thumbnail = 'http://icons.iconarchive.com/icons/treetog/junior/128/document-excel-icon.png';

    } else {
      thumbnail = 'http://ciudad-escuela.org/wp-content/uploads/2014/04/quincem-badge-archivo.urbano-234x234.png';
    }

    return thumbnail;
  }

  onSubmit(): void {
    this.submit.emit();
  }

  clear(): void {
    this.fileToTransfer = null;
    this.thumbnail = null;
    this.propagateChange('null');
  }
}
