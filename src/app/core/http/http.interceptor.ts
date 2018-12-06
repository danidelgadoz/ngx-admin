import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpHeaders, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { map, catchError, finalize, timeout } from 'rxjs/operators';
import { HttpApi } from './http-api';
import { HttpError } from './http-error';

import { AuthenticationService } from '../services/authentication.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  started: number;
  urlPath: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = `${environment.backend.host}/${req.url}`;

    let headers: HttpHeaders = req.headers;
    headers = this.authenticationService.getApiToken() ? headers.set('Authorization', this.authenticationService.getApiToken()) : headers;

    const authReq = req.clone({ url: url, headers: headers });

    return next
    .handle(authReq)
    .pipe(
      timeout(30000),
      map((res) => this.handleSuccessfulResponse(res)),
      catchError((err) => this.handleErrorResponse(err)),
      finalize(this.handleRequestCompleted.bind(this))
    );
  }

  private handleSuccessfulResponse(event): HttpResponse<any> {
    // console.log('response at interceptor', event);

    if (event instanceof HttpResponse) {
      event = event.clone({ body: event.body.response });
    }
    return event;
  }

  private handleErrorResponse(errorResponse): Observable<HttpEvent<any>> {
    // console.log('error at interceptor', errorResponse);

    if (errorResponse instanceof TimeoutError) {
      return throwError('Timeout Exception');
    }

    switch (errorResponse.status) {
      case 401: // Unauthorized
        if (this.authenticationService.isLogged()) {
          this.authenticationService
              .logout()
              .subscribe(() => {
                this.router.navigate(['authentication/login']);
              });
        }
        break;
      case 503: // Service Unavailable
        break;
      case 503: // Internal Server Error
        break;
      default: // Other Error
    }

    let customError = new HttpError();
    try {
      customError = HttpError.initWithCode(errorResponse.error.errors[0].code);
    } catch (e) { }

    return throwError(customError);
  }

  private handleRequestCompleted(): void {
    // console.log(`Request finished`);
  }
}
