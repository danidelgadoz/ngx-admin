import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppInterceptor } from './http/http.interceptor';
import { NotFoundComponent } from './layouts/not-found/not-found.component';
import { LoaderComponent } from './layouts/loader/loader.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    LoaderComponent
  ],
  imports: [
    BrowserAnimationsModule, // For AngularMaterial Components
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
  ],
  exports: [
    LoaderComponent
  ]
})
export class CoreModule { }
