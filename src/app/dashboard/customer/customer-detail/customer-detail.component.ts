import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  pageType: string;
  clientForm: FormGroup;
  addSuscription: Subscription;

  constructor(
    private customerService: CustomerService,
    private loaderService: LoaderService,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.initFormBuilder();
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    if (id) {
      this.pageType = 'edit';
      this.loaderService.show();
      this.customerService
        .get(id)
        .subscribe(
          data => this.loadFormData(data),
          error => {},
          () => this.loaderService.hide()
        );
    } else {
      this.pageType = 'new';
    }
  }

  private initFormBuilder(): void {
    this.clientForm = new FormGroup({
      name: new FormControl({ value: '', disabled: false }, Validators.required),
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
    // this.clientForm.disable();
  }

  saveCustomer() {
    const data = this.clientForm.getRawValue();

    this.addSuscription = this.customerService
    .update(data)
    .subscribe(response => {
      this.snackBar.open('Customer edited', 'OK', {
        verticalPosition: 'bottom',
        duration: 3000
      });
    },
    error => {
    });
  }

  addCustomer() {
    const data = this.clientForm.getRawValue();

    this.addSuscription = this.customerService
      .add(data)
      .subscribe(response => {
        this.snackBar.open('Customer added', 'OK', {
          duration: 3000
        });
      },
      error => {
        this.snackBar.open('Something went wrong', 'OK', {
          duration: 3000
        });
      });
  }

}
