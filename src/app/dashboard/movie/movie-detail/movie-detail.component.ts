import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  clientId: string;
  pageType: string;
  clientForm: FormGroup;
  addSuscription: Subscription;
  deleteSuscription: Subscription;

  constructor(
    private movieService: MovieService,
    public dialog: MatDialog,
    private loaderService: LoaderService,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.initFormBuilder();
  }

  ngOnInit() {
    this.clientId = this.route.snapshot.params['id'];

    if (this.clientId) {
      this.pageType = 'edit';
      this.loaderService.show();
      this.movieService
        .get(this.clientId)
        .subscribe(
          data => this.loadFormData(data),
          error => {},
          () => this.loaderService.hide()
        );
    } else {
      this.pageType = 'new';
    }
  }

  private initFormBuilder(): void {
    this.clientForm = new FormGroup({
      adult: new FormControl({ value: '', disabled: false }),
      backdrop_path: new FormControl({ value: '', disabled: false }),
      // genre_ids: new FormControl({ value: '', disabled: false }),
      // id: new FormControl({ value: '', disabled: false }),
      original_language: new FormControl({ value: '', disabled: false }),
      original_title: new FormControl({ value: '', disabled: false }),
      overview: new FormControl({ value: '', disabled: false }),
      popularity: new FormControl({ value: '', disabled: false }),
      poster_path: new FormControl({ value: '', disabled: false }),
      release_date: new FormControl({ value: '', disabled: false }),
      title: new FormControl({ value: '', disabled: false }, Validators.required),
      video: new FormControl({ value: '', disabled: false }),
      vote_average: new FormControl({ value: '', disabled: false }),
      vote_count: new FormControl({ value: '', disabled: false }),
    });
  }

  private loadFormData(movie: Movie): void {
    this.clientForm.setValue({
      adult: movie.adult,
      backdrop_path: movie.backdrop_path,
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
    // this.clientForm.disable();
  }

  // confirmDeleteCustomer() {
  //   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  //     data: {
  //       title: 'Confirm',
  //       body: 'Are you sure you want to delete this customer?'
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.deleteCustomer();
  //     }
  //   });
  // }

  // deleteCustomer() {
  //   this.deleteSuscription = this.movieService
  //   .delete(this.clientId)
  //   .subscribe(response => {
  //     this.snackBar.open('Movie deleted', 'OK', {
  //       duration: 3000
  //     });
  //   },
  //   error => {
  //   });
  // }

  // saveCustomer() {
  //   const data = this.clientForm.getRawValue();

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
  //   const data = this.clientForm.getRawValue();

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
