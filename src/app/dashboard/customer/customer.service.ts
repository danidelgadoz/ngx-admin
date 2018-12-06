import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpApi } from '../../core/http/http-api';

import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  list(): Observable<any> {
    return this.http.get(HttpApi.customerList)
                    .pipe(
                      map((response: any) => response ),
                      catchError((err, caught) => EMPTY)
                    );
  }

  get(id: string): Observable<Customer> {
    return this.http.get(`${HttpApi.getCustomer}/${id}`)
                    .pipe(
                      map((data: any): Customer => {
                        return new Customer(
                          data.id,
                          data.documentType,
                          data.documentNumber,
                          data.name,
                          data.phoneNumber,
                          data.email,
                          data.address,
                        );
                      }),
                      catchError((err, caught) => EMPTY)
                    );
  }

}
