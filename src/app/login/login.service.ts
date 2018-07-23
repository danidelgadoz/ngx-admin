import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private authData = environment.oauth;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('client_id', this.authData.client_id);
    body.set('client_secret', this.authData.client_secret);
    body.set('grant_type', this.authData.grant_type);
    body.set('username', username);
    body.set('password', password);
    body.set('scope', this.authData.scope);

    const options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http.post(`${this.authData.url}/oauth/token`, body.toString(), options)
                    .pipe(map((response: any) => {
                      localStorage.setItem('session', JSON.stringify(response));
                      return response;
                    }));
  }

  public isLogged(): boolean {
    return localStorage.getItem('session') ? true : false;
  }

  public logout(): Observable<any> {
    localStorage.clear();

    return of(null);
  }
}
