import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../core/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ToggleSidenavDemo = true;
  SidenavFixedState = false;

  constructor(
    private _element: ElementRef,
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

  public toggleFullscreen() {
    const elem = this._element.nativeElement.querySelector('.dashboard');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.msRequestFullScreen) {
      elem.msRequestFullScreen();
    }
  }
}
