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
}
