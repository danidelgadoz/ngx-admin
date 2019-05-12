import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSnackBarModule, MatDialogModule } from '@angular/material';

import { CustomerService } from '../customer.service';
import { FakeCustomerService } from '../../../../test/fakes.spec';
import { CustomerDetailComponent } from './customer-detail.component';
import { EMPTY, throwError } from 'rxjs';

fdescribe('CustomerDetailComponent', () => {
  let component: CustomerDetailComponent;
  let fixture: ComponentFixture<CustomerDetailComponent>;
  let customerService: CustomerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatDialogModule
      ],
      providers: [
        { provide: CustomerService, useClass: FakeCustomerService },
      ],
      declarations: [ CustomerDetailComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

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
    spyOn(component.snackBar, 'open');

    component.addCustomer();

    expect(component.snackBar.open).toHaveBeenCalledWith('Customer added', 'OK', {duration: 3000});
  });

  it('should display a warning message if server returns an error when adding a new customer', () => {
    spyOn(customerService, 'add').and.returnValue(throwError(null));
    spyOn(component.snackBar, 'open');

    component.addCustomer();

    expect(component.snackBar.open).toHaveBeenCalledWith('Something went wrong', 'OK', {duration: 3000});
  });
});
