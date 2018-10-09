import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

import { AuthenticationService } from '../authentication.service';
import { DashboardComponent } from '../../dashboard/dashboard.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: string;

  public updateContratoSubscription: Subscription;

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    public snackBar: MatSnackBar
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

  loginUser() {
    this.updateContratoSubscription = this.authenticationService
      .login(this.form.value.email, this.form.value.password)
      .subscribe(
        data => {
          console.log('Authorized', data);
          this.router.navigate(DashboardComponent.path());
        },
        error => {
          console.error('Unauthorized', error);

          this.snackBar.open('Contraseña o usuario incorrecto', '', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom'
          });
        }
      );
  }

}
