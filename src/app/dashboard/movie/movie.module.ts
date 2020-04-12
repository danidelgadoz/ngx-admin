import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { MovieRoutingModule } from './movie.route';
import { MovieService } from './movie.service';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

@NgModule({
  declarations: [MovieListComponent, MovieDetailComponent],
  imports: [
    MovieRoutingModule,
    SharedModule
  ],
  providers: [MovieService]
})
export class MovieModule { }
