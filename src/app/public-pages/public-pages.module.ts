import { NgModule } from '@angular/core';
import { SharedModule } from '../@shared/shared.module';

import { PublicPagesRoutingModule } from './public-pages.route';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    SharedModule,
    PublicPagesRoutingModule
  ],
  declarations: [NotFoundComponent]
})
export class PublicPagesModule { }
