import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/services/auth.service';
import { SidenavComponent } from './layouts/sidenav/sidenav.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  static path = () => ['dashboard'];

  @ViewChild('appSideNav', { static: false }) appSidenavComponent!: SidenavComponent;

  constructor(
    private elementRef: ElementRef,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['auth/login']);
  }

  toggleFullscreen() {
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

  onToggeleSidenav() {
    this.appSidenavComponent.toggle();
  }
}
