import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

import { LoaderService } from '../../../@core/components/loader/loader.service';
import { FileService } from '../payment.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  ELEMENT_DATA: PeriodicElement[];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private fileService: FileService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;

    this.loaderService.show();

    this.fileService
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
