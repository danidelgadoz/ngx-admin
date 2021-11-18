import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EMPTY, throwError, of } from 'rxjs';

import { CustomerService } from '../customer.service';
import { FakeCustomerService } from '../../../../test/fakes.spec';
import { CustomerDetailComponent } from './customer-detail.component';

describe('CustomerDetailComponent', () => {
  let component: CustomerDetailComponent;
  let fixture: ComponentFixture<CustomerDetailComponent>;
  let customerService: CustomerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerDetailComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSnackBarModule,
      ],
      providers: [
        { provide: CustomerService, useClass: FakeCustomerService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    customerService = TestBed.get(CustomerService);
  });

  it('should call the server to save the changes when a new customer is added', () => {
    const spy = spyOn(customerService, 'add').and.returnValue(EMPTY);

    component.addCustomer();

    expect(spy).toHaveBeenCalled();
  });

  it('should display a success message if server returns the customer added', () => {
    // @ts-ignore
    spyOn(component.snackBar, 'open');

    component.addCustomer();

    // @ts-ignore
    expect(component.snackBar.open).toHaveBeenCalledWith('Customer added', 'OK', { duration: 3000 });
  });

  it('should display a warning message if server returns an error when adding a new customer', () => {
    spyOn(customerService, 'add').and.returnValue(throwError(null));
    // @ts-ignore
    spyOn(component.snackBar, 'open');

    component.addCustomer();

    // @ts-ignore
    expect(component.snackBar.open).toHaveBeenCalledWith('Something went wrong', 'OK', { duration: 3000 });
  });

  it('should call server to delete a customer if the user confirms', () => {
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(true) });
    const spy = spyOn(customerService, 'delete').and.returnValue(EMPTY);

    component.confirmDeleteCustomer();

    expect(spy).toHaveBeenCalled();
  });

  it('should NOT call server to delete a customer if the user cancels', () => {
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(false) });
    const spy = spyOn(customerService, 'delete').and.returnValue(EMPTY);

    component.confirmDeleteCustomer();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should display a success message if server responses that customer has been deleted', () => {
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(true) });
    // @ts-ignore
    spyOn(component.snackBar, 'open');

    component.confirmDeleteCustomer();

    // @ts-ignore
    expect(component.snackBar.open).toHaveBeenCalledWith('Customer deleted', 'OK', { duration: 3000 });
  });
});
