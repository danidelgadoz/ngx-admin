import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { AuthenticationService } from './authentication/authentication.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  started: number;
  urlPath: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.started = Date.now();
    this.urlPath = req.urlWithParams;

    const authReq = req.clone({
      setHeaders: { Authorization: this.authenticationService.getApiToken() }
    });

    return next
    .handle(authReq)
    .pipe(
      tap(
        this.processRequest.bind(this),
        this.processRequestError.bind(this)
      ),
      finalize(
        this.processRequestfinalize.bind(this)
      )
    );
  }

  private processRequest(event): HttpResponse<any> {
    if (event instanceof HttpResponse) {
      event = event.clone({ body: event.body });
    }
    return event;
  }

  private processRequestError(error): HttpErrorResponse {
    switch (error.status) {
      case 401: // Unauthorized
        this.authenticationService
            .logout()
            .subscribe(() => {
              this.router.navigate(['authentication/login']);
            });
        break;
      case 503: // Service Unavailable
        break;
      case 503: // Internal Server Error
        break;
      default: // Other Error
    }

    return error;
  }

  private processRequestfinalize(): void {
    console.log(`Request for ${this.urlPath} took ${Date.now() - this.started} ms.`);
  }
}
