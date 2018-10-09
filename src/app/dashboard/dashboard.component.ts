import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ToggleSidenavDemo = true;
  SidenavFixedState = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  public static path(): string[] {
    return ['dashboard'];
  }

  ngOnInit() {
  }

  public logout(): void {
    this.authenticationService
        .logout()
        .subscribe(() => {
            this.router.navigate(['authentication/login']);
        });
  }
}
