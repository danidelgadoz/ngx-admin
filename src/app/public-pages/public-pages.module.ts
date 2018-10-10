import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicPagesRoutingModule } from './public-pages.route';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    PublicPagesRoutingModule
  ],
  declarations: [NotFoundComponent]
})
export class PublicPagesModule { }
