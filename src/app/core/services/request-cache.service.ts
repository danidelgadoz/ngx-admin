import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestCache  {
  private cache = new Map<string, HttpResponse<any>>();
  private pending = new Map<string, Subject<HttpResponse<any>>>();

  public get(req: HttpRequest<any>): Observable<HttpResponse<any>> | undefined {
    const cached = this.cache.get(this.getKeyXHR(req));
    if (cached) {
      return of(cached);
    }

    const pending = this.pending.get(this.getKeyXHR(req));
    if (pending) {
      return pending.pipe(take(1));
    }

    this.pending.set(this.getKeyXHR(req), new Subject<HttpResponse<any>>());

    return undefined;
  }

  public put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    this.cache.set(this.getKeyXHR(req), response);

    setTimeout(() => {
      this.pending.get(this.getKeyXHR(req)).next(response);
    }, 0);
  }

  public clear(): void {
    this.cache.clear();
    this.pending.clear();
  }

  public finishPendingSubject(req: HttpRequest<any>): void {
    setTimeout(() => {
      this.pending.delete(this.getKeyXHR(req));
    }, 0);
  }

  private getKeyXHR(req: HttpRequest<any>): string {
    return `${req.urlWithParams}***${JSON.stringify(req.body)}`;
  }

}

