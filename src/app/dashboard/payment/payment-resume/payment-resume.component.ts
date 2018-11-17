import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../../../@shared/components/loader/loader.service';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payment-resume',
  templateUrl: './payment-resume.component.html',
  styleUrls: ['./payment-resume.component.scss']
})
export class PaymentResumeComponent implements OnInit {
  fileSelected: any;
  fileAvailable: any;
  FileSubmitSuccessful: Boolean = false;

  constructor(
    private paymentService: PaymentService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    // setTimeout(() => {
    //   this.fileAvailable = {
    //     name: 'nombre_del_archivo.txt',
    //     date: 'Jueves 04  Octubre 2018.',
    //     time: '23:45',
    //     rows: '198',
    //   };
    // }, 10);
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('file', this.fileSelected);

    this.loaderService.show();

    this.paymentService
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

  onDownload() {
    console.log('onDownload...');
  }

}
