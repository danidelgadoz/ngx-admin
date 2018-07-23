import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LoginService } from '../login/login.service';
import { LoginComponent } from '../login/login.component';

@Injectable()
export class DashboardGuard implements CanActivate {

    constructor(
        private loginService: LoginService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.loginService.isLogged()) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(LoginComponent.path(), { queryParams: { returnUrl: state.url }});
        return false;
    }
}
