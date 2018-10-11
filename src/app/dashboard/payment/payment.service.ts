import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = environment.backend.host;

  constructor(private http: HttpClient) { }

  list(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/payment`)
                    .pipe(
                      map((response: any) => response ),
                      catchError((err, caught) => EMPTY)
                    );
  }

  upload(body: any): Observable<any> {
    const options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http.post(`${this.apiUrl}/api/payment/upload`, body)
                    .pipe(map((response: any) => {
                      return response;
                    }));
  }

}
