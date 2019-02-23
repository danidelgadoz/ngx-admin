import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, finalize, switchMap, filter, take } from 'rxjs/operators';
import { HttpApi } from './http-api';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class Oauth2Interceptor implements HttpInterceptor {
  refreshTokenInProgress: boolean;
  refreshTokenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next
    .handle(this.performRequest(req))
    .pipe(
      catchError((err) => this.processRequestError(err, req, next))
    );
  }

  private performRequest(req: HttpRequest<any>): HttpRequest<any> {
    let headers: HttpHeaders = req.headers;
    
    if (this.isAuthenticationRequired(req.url)) {
        headers = headers.set('Authorization', `Bearer ${this.authenticationService.accessToken}`);
    }
    
    return req.clone({ headers: headers });
  }

  private processRequestError(error: HttpErrorResponse, req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (error.status === 401 && this.authenticationService.isLogged()) {
      return this.tryAgainWithRefresToken(req, next);
    }

    return Observable.throw(error);
}

  // Helpers and Casuistics
  private isAuthenticationRequired(apiUrl: string): Boolean {
    const blockedApiList = [HttpApi.oauthLogin];
    return blockedApiList.includes(apiUrl) ? false : true;
  }

  private tryAgainWithRefresToken(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (!this.refreshTokenInProgress) {
        // Set the refreshToknSubject to null so that subsequent API calls will wait until the new token has been retrieved
        this.refreshTokenSubject.next(null);
        this.refreshTokenInProgress = true;

        return this.authenticationService
            .loginWithRefreshToken()
            .pipe(
                switchMap((result) => {
                    if (result) {
                        this.refreshTokenSubject.next(result);
                        return next.handle(this.performRequest(req));
                    }

                    throw new Error('Acceso denegado.');
                }),
                catchError(error => {
                    this.authenticationService.logout();
                    return Observable.throw(error);
                }),
                finalize(() => {
                    this.refreshTokenInProgress = false;
                })
            );
    } else {
        return this.refreshTokenSubject
            .pipe(
                filter(result => result != null),
                take(1),
                switchMap(() => next.handle(this.performRequest(req)))
            );
    }
  }
}
