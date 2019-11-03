import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { LoaderService } from '../../../core/services/loader.service';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ELEMENT_DATA: Customer[];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  displayedColumns: string[] = [
    'documentType',
    'name',
    'phoneNumber',
    'email',
    'address'
  ];

  constructor(
    private customerService: CustomerService,
    private loaderService: LoaderService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loadCustomers();
  }

  loadCustomers() {
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

  onCustomerAddNavigate() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onCustomerDetailNavigate(customer: Customer) {
    this.router.navigate([customer.id], { relativeTo: this.route });
  }

}
