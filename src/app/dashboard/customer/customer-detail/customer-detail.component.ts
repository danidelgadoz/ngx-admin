import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { LoaderService } from '../../../core/services/loader.service';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  clientForm: FormGroup;

  constructor(
    private customerService: CustomerService,
    private loaderService: LoaderService,
    private route: ActivatedRoute
  ) {
    this.initFormBuilder();
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    if (id) {
      this.loaderService.show();
      this.customerService
        .get(id)
        .subscribe(
          data => this.loadFormData(data),
          error => {},
          () => this.loaderService.hide()
        );
    }
  }

  private initFormBuilder(): void {
    this.clientForm = new FormGroup({
      name: new FormControl({ value: '', disabled: false }),
      documentType: new FormControl({ value: '', disabled: false }),
      documentNumber: new FormControl({ value: '', disabled: false }),
      email: new FormControl({ value: '', disabled: false }),
      address: new FormControl({ value: '', disabled: false }),
      phoneNumber: new FormControl({ value: '', disabled: false })
    });
  }

  private loadFormData(customer: Customer): void {
    this.clientForm.setValue({
      name: customer.name,
      documentType: customer.documentType,
      documentNumber: customer.documentNumber,
      email: customer.email,
      address: customer.address,
      phoneNumber: customer.phoneNumber
    });
    this.clientForm.disable();
  }

}
