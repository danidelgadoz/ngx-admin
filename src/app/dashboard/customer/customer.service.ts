import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpApi } from '../../@core/http/http-api';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  list(): Observable<any> {
    return this.http.get(HttpApi.paymentList)
                    .pipe(
                      map((response: any) => response ),
                      catchError((err, caught) => EMPTY)
                    );
  }

}
