import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { CustomerListComponent } from './customer-list.component';
import { CustomerService } from '../customer.service';
import { FakeCustomerService } from '../../../../test/fakes.spec';
import { of } from 'rxjs';

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let customerService: CustomerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatTableModule
      ],
      providers: [
        { provide: CustomerService, useClass: FakeCustomerService },
      ],
      declarations: [ CustomerListComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    customerService = TestBed.get(CustomerService);
  });

  it('should set customers table with the list returned from the server', () => {
    spyOn(customerService, 'list').and.callFake(() => {
      return of([]);
    });

    component.ngOnInit();
    expect(component.dataSource.data.length).toBeGreaterThanOrEqual(0);
  });
});
