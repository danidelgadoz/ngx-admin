import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ToggleSidenavDemo = true;
  SidenavFixedState = false;

  constructor(
    private elementRef: ElementRef,
    private authService: AuthService,
    private router: Router
  ) { }

  public static path(): string[] {
    return ['dashboard'];
  }

  ngOnInit() {
  }

  public logout(): void {
    this.authService.logout()
    this.router.navigate(['auth/login']);
  }

  public toggleFullscreen() {
    const elem = this.elementRef.nativeElement.querySelector('.dashboard');
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
