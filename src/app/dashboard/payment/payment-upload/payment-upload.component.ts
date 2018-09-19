import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../../../@core/components/loader/loader.service';
import { FileService } from '../payment.service';

@Component({
  selector: 'app-payment-upload',
  templateUrl: './payment-upload.component.html',
  styleUrls: ['./payment-upload.component.scss']
})
export class PaymentUploadComponent implements OnInit {
  fileArray: any[] = [];

  constructor(
    private fileService: FileService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
  }

  filesLoaded() {
    console.log(this.fileArray);

    const formData = new FormData();
    // formData.append('file', this.fileArray[0]);

    for (let x = 0; x < this.fileArray.length; x++) {
      formData.append('images_list[]', this.fileArray[x]);
    }

    this.loaderService.show();

    this.fileService
      .upload(formData)
      .subscribe(
        data => {
          console.log('data', data);
        },
        error => {
        },
        () => this.loaderService.hide()
      );
  }

}
