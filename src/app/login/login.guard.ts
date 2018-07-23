import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LoginService } from '../login/login.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Injectable()
export class LoginGuard implements Resolve<any> {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.loginService.isLogged()) {
      this.router.navigate(DashboardComponent.path());
    }
  }
}
