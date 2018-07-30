import { Component, Input, Output, forwardRef, EventEmitter  } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileInputComponent),
      multi: true,
    }
  ],
})
export class FileInputComponent implements ControlValueAccessor {
  @Output() upload: EventEmitter<any[]> = new EventEmitter<any[]>();

  private inputValue: any;
  gallery: any[] = [];

  constructor(private sanitizer: DomSanitizer) {}

  public writeValue(initialValue: any) {
    if (initialValue) {
      this.inputValue = initialValue;
    }
  }

  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  public registerOnTouched() { }

  private propagateChange = (_: any) => {};

  private addToGallery(event) {
    let fileList: File[] = [];

    if (event.target.files && event.target.files.length > 0) { // when is loaded by fileUploadPopup
      fileList = event.target.files;
    } else if ( event.dataTransfer) { // when is loaded by dragAndDrop
      fileList = event.dataTransfer.files;
    }

    if (fileList.length < 0)
      return;

    const galleryLengthBefore = this.gallery.length;

    for (let i = 0; i < fileList.length; i++) {
      const reader = new FileReader();

      reader.onload = (function(_file, _this, _filesAmount){
        return function(e){
          _this.gallery.push(_file);
          if(_this.gallery.length == (_filesAmount + galleryLengthBefore))
            _this.upload.emit();
        };
      })(fileList[i], this, fileList.length); // callback when the images have been loaded
      reader.readAsDataURL(fileList[i]);
    }

    this.propagateChange(this.gallery);
  }

  private removeFromGallery(index) {
    this.gallery.splice(index, 1);
    this.propagateChange(this.gallery);
    this.upload.emit();
  }

  private cleanGallery() {
    this.gallery = [];
    this.propagateChange(this.gallery);
    this.upload.emit();
  }

  private getImagePreview(file) {
    return file.type.includes('image') ? this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file)) : 'http://ciudad-escuela.org/wp-content/uploads/2014/04/quincem-badge-archivo.urbano-234x234.png';
  }

  /*private onChange(event) {
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();

        reader.onload = (_event:any) => {
            this.gallery.push({
                link: _event.target.result,
                file: event.srcElement.files[0],
                name: event.srcElement.files[0].name
            });
        }
        reader.readAsDataURL(event.target.files[0]);
        this.propagateChange(this.gallery);
    }
  }*/
}
