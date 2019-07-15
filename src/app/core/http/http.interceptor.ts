import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { map, catchError, finalize, timeout } from 'rxjs/operators';

import { HttpError } from './http-error';
import { environment } from '../../../environments/environment';

const APP_XHR_TIMEOUT = 30000;

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next
    .handle(this.performRequest(req))
    .pipe(
      timeout(APP_XHR_TIMEOUT),
      map((res) => this.handleSuccessfulResponse(res)),
      catchError((err) => this.handleErrorResponse(err)),
      finalize(this.handleRequestCompleted.bind(this))
    );
  }

  private performRequest(req: HttpRequest<any>): HttpRequest<any> {
    let headers: HttpHeaders = req.headers;
    headers = headers.set('MyCustomHeaderKey', `MyCustomHeaderValue`);
    // headers = headers.set('MyCustomHeaderKey', `MyCustomHeaderValue`);

    return req.clone({ url: `${environment.backend.host}/${req.url}`, headers });
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
