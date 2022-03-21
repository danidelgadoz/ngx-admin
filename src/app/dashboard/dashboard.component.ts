import { Component, OnInit, ViewChild } from '@angular/core';

import { SidenavComponent } from './layouts/sidenav/sidenav.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  static path = () => ['dashboard'];

  @ViewChild('appSideNav', { static: false }) appSidenavComponent!: SidenavComponent;

  constructor() { }

  ngOnInit() {
  }

  onSidenavToggle() {
    this.appSidenavComponent.toggle();
  }
}
