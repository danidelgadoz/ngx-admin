import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AuthenticationRoutingModule } from './authentication.route';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    SharedModule,
    AuthenticationRoutingModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthenticationModule { }
