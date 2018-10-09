import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from './authentication.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Injectable()
export class LoginGuard implements Resolve<any> {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.isLogged()) {
      this.router.navigate(DashboardComponent.path());
    }
  }
}
