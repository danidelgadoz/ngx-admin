import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Main routes for application
    CoreModule,       // Singleton objects (services, components and resources that are loaded only at app.module level)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
