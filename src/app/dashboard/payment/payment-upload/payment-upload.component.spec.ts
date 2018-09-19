import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentUploadComponent } from './payment-upload.component';

describe('PaymentUploadComponent', () => {
  let component: PaymentUploadComponent;
  let fixture: ComponentFixture<PaymentUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
