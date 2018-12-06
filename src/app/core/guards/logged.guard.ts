import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class Logged implements Resolve<any> {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.isLogged()) {
      this.router.navigate(['/dashboard']);
    }
  }
}
