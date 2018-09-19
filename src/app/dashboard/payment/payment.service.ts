import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = environment.backend.host;

  constructor(private http: HttpClient) { }

  upload(body: any): Observable<any> {
    const options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http.post(`${this.apiUrl}/payment/upload`, body)
                    .pipe(map((response: any) => {
                      return response;
                    }));
  }

}
