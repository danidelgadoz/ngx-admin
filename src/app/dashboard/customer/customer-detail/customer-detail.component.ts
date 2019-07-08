import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { LoaderService } from '../../../core/services/loader.service';
import { ConfirmDialogComponent } from '../../../shared/utils/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  clientId: string;
  pageType: string;
  clientForm: FormGroup;
  addSuscription: Subscription;
  deleteSuscription: Subscription;

  constructor(
    private customerService: CustomerService,
    public dialog: MatDialog,
    private loaderService: LoaderService,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.initFormBuilder();
  }

  ngOnInit() {
    this.clientId = this.route.snapshot.params['id'];

    if (this.clientId) {
      this.pageType = 'edit';
      this.loaderService.show();
      this.customerService
        .get(this.clientId)
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

  confirmDeleteCustomer() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm',
        body: 'Are you sure you want to delete this customer?'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCustomer();
      }
    });
  }

  deleteCustomer() {
    this.deleteSuscription = this.customerService
    .delete(this.clientId)
    .subscribe(response => {
      this.snackBar.open('Customer deleted', 'OK', {
        duration: 3000
      });
    },
    error => {
    });
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
