import { NgModule } from '@angular/core';
import { SharedModule } from '../@shared/shared.module';

import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [NotFoundComponent]
})
export class PublicPagesModule { }
