import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private authData = environment.oauth;

  constructor(private http: HttpClient) { }

  login(body: any): Observable<any> {
    const options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http.post('http://localhost:8000/api/noticia', body)
                    .pipe(map((response: any) => {
                      return response;
                    }));
  }

}
