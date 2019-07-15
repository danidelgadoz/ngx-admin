import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, of, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpCacheService  {
  private cache = new Map<string, HttpResponse<any>>();
  private pending = new Map<string, Subject<HttpResponse<any>>>();

  public get(req: HttpRequest<any>): Observable<HttpResponse<any>> | undefined {
    const cached = this.cache.get(this.getKeyXHR(req));
    if (cached) {
      return of(cached);
    }

    const pending = this.pending.get(this.getKeyXHR(req));
    if (pending) {
      return pending.pipe(
        delay(1), // for paralell xhr response order, otherwise cached will cast before xhr... Is for style, it doesn't kill flow
        catchError(error => throwError(error))
      );
    }

    this.pending.set(this.getKeyXHR(req), new Subject<HttpResponse<any>>());

    return undefined;
  }

  public set(req: HttpRequest<any>, response: HttpResponse<any>): void {
    this.cache.set(this.getKeyXHR(req), response);
  }

  public cast(req: HttpRequest<any>, response: HttpResponse<any>, error?: HttpErrorResponse): void {
      if (response) {
        this.pending.get(this.getKeyXHR(req)).next(response);
      }

      if (error) {
        this.pending.get(this.getKeyXHR(req)).error(error);
      }
  }

  public complete(req: HttpRequest<any>): void {
      this.pending.get(this.getKeyXHR(req)).complete();
      this.pending.delete(this.getKeyXHR(req));
  }

  public clear(): void {
    this.cache.clear();
  }

  private getKeyXHR(req: HttpRequest<any>): string {
    return `${req.urlWithParams}***${JSON.stringify(req.body)}`;
  }

}
