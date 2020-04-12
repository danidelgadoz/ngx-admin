import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieService } from './movie.service';

@NgModule({
  declarations: [
    ...MovieRoutingModule.components
  ],
  imports: [
    MovieRoutingModule,
    SharedModule
  ],
  providers: [MovieService]
})
export class MovieModule { }
