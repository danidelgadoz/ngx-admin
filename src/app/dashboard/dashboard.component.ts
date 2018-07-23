import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  public static path(): string[] {
    return ['dashboard'];
  }

  ngOnInit() {
  }

  private logout(): void {
    this.loginService
        .logout()
        .subscribe(() => {
            this.router.navigate(['login']);
        });
}

}
