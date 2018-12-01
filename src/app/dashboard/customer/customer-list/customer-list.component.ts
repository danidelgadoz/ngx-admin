import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

import { LoaderService } from '../../../@shared/components/loader/loader.service';
import { CustomerService } from '../customer.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  ELEMENT_DATA: PeriodicElement[];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private customerService: CustomerService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;

    this.loaderService.show();

    this.customerService
      .list()
      .subscribe(
        data => {
          this.dataSource.data = data;
        },
        error => {
        },
        () => this.loaderService.hide()
      );
  }

}
