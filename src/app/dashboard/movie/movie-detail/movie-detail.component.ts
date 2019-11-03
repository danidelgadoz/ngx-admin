import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';
import { LoaderService } from '../../../core/services/loader.service';
import { ConfirmDialogComponent } from '../../../shared/utils/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movieId: string;
  pageType: string;
  movieForm: FormGroup;
  addSuscription: Subscription;
  deleteSuscription: Subscription;
  movie: Movie;

  constructor(
    private movieService: MovieService,
    public dialog: MatDialog,
    private loaderService: LoaderService,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.initFormBuilder();
  }

  ngOnInit() {
    this.movieId = this.route.snapshot.params.id;

    if (this.movieId) {
      this.pageType = 'edit';
      this.loaderService.show();
      this.movieService
        .get(this.movieId)
        .subscribe(
          data => this.loadFormData(data),
          error => {},
          () => this.loaderService.hide()
        );
    } else {
      this.pageType = 'new';
    }

    this.showMockedFeaturesWarning();
  }

  navigateToListPage() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  confirmDeleteMovie() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm',
        body: 'Are you sure you want to delete this movie?'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteMovie();
      }
    });
  }

  private initFormBuilder() {
    this.movieForm = new FormGroup({
      adult: new FormControl({ value: null, disabled: false }),
      backdrop_path: new FormControl({ value: null, disabled: false }),
      budget: new FormControl({ value: null, disabled: false }),
      homepage: new FormControl({ value: null, disabled: false }),
      // genre_ids: new FormControl({ value: null, disabled: false }),
      // id: new FormControl({ value: null, disabled: false }),
      original_language: new FormControl({ value: null, disabled: false }),
      original_title: new FormControl({ value: null, disabled: false }),
      overview: new FormControl({ value: null, disabled: false }),
      popularity: new FormControl({ value: null, disabled: false }),
      poster_path: new FormControl({ value: null, disabled: false }),
      release_date: new FormControl({ value: null, disabled: false }),
      title: new FormControl({ value: null, disabled: false }, Validators.required),
      video: new FormControl({ value: null, disabled: false }),
      vote_average: new FormControl({ value: null, disabled: false }),
      vote_count: new FormControl({ value: null, disabled: false }),
    });
  }

  private loadFormData(movie: Movie) {
    this.movie = movie;

    this.movieForm.setValue({
      adult: movie.adult,
      backdrop_path: movie.backdrop_path,
      budget: movie.budget,
      homepage: movie.homepage,
      // genre_ids: movie.genre_ids,
      // id: movie.id,
      original_language: movie.original_language,
      original_title: movie.original_title,
      overview: movie.overview,
      popularity: movie.popularity,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      title: movie.title,
      video: movie.video,
      vote_count: movie.vote_count,
      vote_average: movie.vote_average,
    });
  }

  private deleteMovie() {
    this.deleteSuscription = this.movieService
      .delete(this.movieId)
      .subscribe(() => {
        this.snackBar.open('Movie fake delete, because there is not a delete API available', 'OK', { duration: 5000 });
      },
      error => {
      });
  }

  private showMockedFeaturesWarning() {
    this.snackBar.open('This module is build with "The Movie Database API", and write methods are not available', 'OK', { duration: 10000 });
  }

  // saveCustomer() {
  //   const data = this.movieForm.getRawValue();

  //   this.addSuscription = this.movieService
  //   .update(data)
  //   .subscribe(response => {
  //     this.snackBar.open('Movie edited', 'OK', {
  //       verticalPosition: 'bottom',
  //       duration: 3000
  //     });
  //   },
  //   error => {
  //   });
  // }

  // addCustomer() {
  //   const data = this.movieForm.getRawValue();

  //   this.addSuscription = this.movieService
  //     .add(data)
  //     .subscribe(response => {
  //       this.snackBar.open('Movie added', 'OK', {
  //         duration: 3000
  //       });
  //     },
  //     error => {
  //       this.snackBar.open('Something went wrong', 'OK', {
  //         duration: 3000
  //       });
  //     });
  // }

}
