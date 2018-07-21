import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { AppRoutingModule } from './login.route';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
