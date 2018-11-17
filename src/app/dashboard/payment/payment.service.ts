import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpApi } from '../../@core/http/http-api';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  list(): Observable<any> {
    return this.http.get(HttpApi.paymentList)
                    .pipe(
                      map((response: any) => response ),
                      catchError((err, caught) => EMPTY)
                    );
  }

  upload(body: any): Observable<any> {
    const options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http.post(HttpApi.paymentUpload, body)
                    .pipe(map((response: any) => {
                      return response;
                    }));
  }

}
