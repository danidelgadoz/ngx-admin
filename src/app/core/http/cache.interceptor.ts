import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

import { RequestCache } from '../services/request-cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

    constructor(private requestCacheService: RequestCache) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.headers.has('request-cache')) {
            return next.handle(req);
        }

        req = req.clone({ headers: req.headers.delete('request-cache') });

        const cachedResponse = this.requestCacheService.get(req);
        return cachedResponse ? cachedResponse : this.sendRequest(req, next);
    }

    sendRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
        .handle(req)
        .pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    this.requestCacheService.put(req, event);
                }
            }),
            finalize(() => {
                this.requestCacheService.finishPendingSubject(req);
            })
        );
    }

}