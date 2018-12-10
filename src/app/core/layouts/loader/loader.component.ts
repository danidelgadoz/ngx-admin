import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  show: boolean;
  subscription: Subscription;

  constructor(private loaderService: LoaderService) {
    this.show = false;

    this.subscription = this.loaderService.init().subscribe(index => {
      this.show = index;
    });
  }

  ngOnInit() {
  }

}
