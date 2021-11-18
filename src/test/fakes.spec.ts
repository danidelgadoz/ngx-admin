import { Observable, of } from 'rxjs';

export class FakeAuthenticationService {
  public loginWithUserCredentials(username: string, password: string): Observable<any> {
    return of(null);
  }
}

export class FakeCustomerService {
  list(): Observable<any> {
    return of(null);
  }

  get(id: string): Observable<any> {
    return of(null);
  }

  add(customer: any): Observable<any> {
    return of(null);
  }

  update(customer: any): Observable<any> {
    return of(null);
  }

  delete(id: string): Observable<any> {
    return of(null);
  }
}

export class FakeMovieService {
  list(): Observable<any> {
    return of(null);
  }

  get(id: string): Observable<any> {
    return of(null);
  }

  delete(id: string): Observable<any> {
    return of(null);
  }
}
