import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { HttpApi } from '../http/http-api';

const OAUTH_DATA = environment.oauth;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpNoInterceptor: HttpClient;

  constructor(
    private http: HttpClient,
    private handler: HttpBackend
  ) {
    this.httpNoInterceptor = new HttpClient(handler);
}

  public register(userRequest: any): Observable<any> {
    const data = {
      code: userRequest.codigo,
      email: userRequest.email,
      password: userRequest.password
    };

    return this.http.post(HttpApi.userRegister, data)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  public loginWithUserCredentials(username: string, password: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');

    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('client_id', OAUTH_DATA.client_id);
    body.set('client_secret', OAUTH_DATA.client_secret);
    body.set('username', username);
    body.set('password', password);
    body.set('scope', OAUTH_DATA.scope);

    return this.http.post(HttpApi.oauthLogin, body.toString(), { headers })
      .pipe(
        map((response: any) => {
          localStorage.setItem('session', JSON.stringify(response));
          return response;
        })
      );
  }

  public loginWithRefreshToken(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');

    const body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');
    body.set('client_id', OAUTH_DATA.client_id);
    body.set('client_secret', OAUTH_DATA.client_secret);
    body.set('refresh_token', this.refreshToken);
    body.set('scope', OAUTH_DATA.scope);

    return this.http.post(HttpApi.oauthLogin, body.toString(), { headers })
      .pipe(
        map((response: any) => {
          localStorage.setItem('session', JSON.stringify(response));
          return response;
        })
      );
  }

  public isLogged(): boolean {
    return localStorage.getItem('session') ? true : false;
  }

  public logout(): void {
    localStorage.clear();
  }

  get accessToken() {
    return localStorage.session ? JSON.parse(localStorage.session).access_token : null;
  }

  get refreshToken() {
    return localStorage.session ? JSON.parse(localStorage.session).refresh_token : null;
  }
}
