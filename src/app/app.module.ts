import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './@core/core.module';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.route';
import { AppComponent } from './app.component';

import { PublicPagesModule } from './public-pages/public-pages.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    PublicPagesModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
