import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { LoaderService } from '../../../core/services/loader.service';
import { MovieService } from '../../movie/movie.service';
import { Movie } from '../../movie/movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  displayedColumns: string[] = [
    'title',
    'overview',
    'popularity',
    'vote_average',
    'release_date',
  ];
  ELEMENT_DATA: Movie[];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private movieService: MovieService,
    private loaderService: LoaderService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;

    this.loaderService.show();

    this.movieService
      .list()
      .subscribe(
        data => {
          this.dataSource.data = data;
          console.log(data);
          
        },
        error => {
        },
        () => this.loaderService.hide()
      );
  }

  onCustomerAddNavigate(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onMovieDetailNavigate(customer: Movie): void {
    this.router.navigate([customer.id], { relativeTo: this.route });
  }

}
