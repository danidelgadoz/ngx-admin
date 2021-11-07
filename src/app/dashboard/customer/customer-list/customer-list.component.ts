import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs/operators';

import { LoadingBackdropService } from '../../../core/services/loading-backdrop.service';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Customer>();
  displayedColumns: string[] = [
    'documentType',
    'name',
    'phoneNumber',
    'email',
    'address'
  ];

  constructor(
    private customerService: CustomerService,
    private loadingBackdropService: LoadingBackdropService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loadCustomers();
  }

  loadCustomers() {
    this.loadingBackdropService.show();

    this.customerService
      .list()
      .pipe(finalize(() => this.loadingBackdropService.hide()))
      .subscribe((data) => {
        this.dataSource.data = data;
      });
  }

  onCustomerAddNavigate() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onCustomerDetailNavigate(customer: Customer) {
    this.router.navigate([customer.id], { relativeTo: this.route });
  }

}
