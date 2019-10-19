import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ELEMENT_DATA: Movie[];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  displayedColumns: string[] = [
    'title',
    'overview',
    'popularity',
    'vote_average',
    'release_date',
  ];

  constructor(
    private movieService: MovieService,
    private loaderService: LoaderService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loadMovies();
  }

  loadMovies(pageEvent?: PageEvent) {
    const pageIndex = pageEvent ? pageEvent.pageIndex : 0;
    this.loaderService.show();

    this.movieService
      .list(pageIndex)
      .subscribe(
        data => {
          this.dataSource.data = data.results;

          setTimeout(() => {
            this.dataSource.paginator.length = data.total_results;
            this.dataSource.paginator.pageIndex = data.page;
            this.dataSource.paginator.pageSize = 20;
          }, 0);

        },
        error => {
        },
        () => this.loaderService.hide()
      );
  }

  onCustomerAddNavigate() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onMovieDetailNavigate(customer: Movie) {
    this.router.navigate([customer.id], { relativeTo: this.route });
  }

}
