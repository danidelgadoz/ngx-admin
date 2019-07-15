import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';

import { HttpApi } from './http-api';
import { HttpCacheService } from '../services/http-cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

    constructor(private httpCacheService: HttpCacheService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!this.isCacheEnabledForApi(req.url)) {
            return next.handle(req);
        }

        const cachedResponse = this.httpCacheService.get(req);
        return cachedResponse ? cachedResponse : this.sendRequest(req, next);
    }

    private sendRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
        .handle(req)
        .pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    this.httpCacheService.cast(req, event);
                    this.httpCacheService.set(req, event);
                }
            }),
            catchError(error => {
                this.httpCacheService.cast(req, null, error);
                return throwError(error);
            }),
            finalize(() => {
                this.httpCacheService.complete(req);
            })
        );
    }

    private isCacheEnabledForApi(endpoint: string): boolean {
        const apisEnabled = [
            HttpApi.customerList,
            // HttpApi.getCustomer
        ];

        return apisEnabled.includes(endpoint);
    }

}
