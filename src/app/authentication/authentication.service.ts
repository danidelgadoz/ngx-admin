import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { HttpApi } from '../@core/http/http-api';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private httpNoInterceptor: HttpClient;
  private authData = environment.oauth;

  constructor(
    private http: HttpClient,
    private handler: HttpBackend
  ) {
    this.httpNoInterceptor = new HttpClient(handler);
}

  register(userRequest: any): Observable<any> {
    const data = {
      code: userRequest.codigo,
      email: userRequest.email,
      password: userRequest.password
    };

    return this.http.post(HttpApi.userRegister, data)
                    .pipe(
                      map((response: any) => {
                        // console.log('response at service', response);
                        return response;
                      }),
                      // catchError((error) => {
                      //   console.log('error at service', error);
                      //   return throwError(error);
                      // })
                    );
  }

  login(username: string, password: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');

    const body = new URLSearchParams();
    body.set('clientId', this.authData.client_id);
    body.set('clientSecret', this.authData.client_secret);
    body.set('grant_type', this.authData.grant_type);
    body.set('username', username);
    body.set('password', password);

    return this.http.post(HttpApi.oauthLogin, body.toString(), {headers: headers})
                    .pipe(
                      map((response: any) => {
                        localStorage.setItem('session', JSON.stringify(response));
                        return response;
                      }),
                      // catchError((error) => {
                      //   console.log('error at service', error);
                      //   return throwError(error);
                      // })
                    );
  }

  public isLogged(): boolean {
    return localStorage.getItem('session') ? true : false;
  }

  public logout(): Observable<any> {
    localStorage.clear();

    return of(null);
  }

  public getApiToken() {
    return localStorage.session ? `Bearer ${JSON.parse(localStorage.session).access_token}` : null;
  }
}
