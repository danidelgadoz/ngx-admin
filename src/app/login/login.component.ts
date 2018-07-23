import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';

import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: string;

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {
    this.form = formBuilder.group({
      email: ['admin@proveedor.com', [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]],
      password: ['', Validators.required]
    });
  }

  public static path(): string[] {
    return ['login'];
  }

  ngOnInit() {
  }

  loginUser(value: any ) {
    this.loginService.login(this.form.value.email, this.form.value.password)
      .subscribe(
        data => {
          console.log('Authorized', data);
          this.router.navigate(DashboardComponent.path());
        },
        error => {
          console.error('Unauthorized', error);
        }
      );
  }

}
