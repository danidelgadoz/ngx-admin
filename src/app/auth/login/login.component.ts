import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AuthService } from '../../core/services/auth.service';
import { DashboardComponent } from '../../dashboard/dashboard.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  message!: string;
  loginSubscription!: Subscription;
  loginLoading = false;
  static path = () => ['login'];

  constructor(
    private authService: AuthService,
    public formBuilder: FormBuilder,
    private router: Router,
    public snackBar: MatSnackBar
  ) {
    this.initFormBuilder();
  }

  ngOnInit() {
  }

  loginUser() {
    this.loginLoading = true;

    this.loginSubscription = this.authService
      .loginWithUserCredentials(this.form.value.email, this.form.value.password)
      .pipe(finalize(() => this.loginLoading = false))
      .subscribe(
        data => {
          this.router.navigate(DashboardComponent.path());
        },
        error => {
          this.snackBar.open('Contraseña o usuario incorrecto', '', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom'
          });
        }
      );
  }

  private initFormBuilder() {
    this.form = this.formBuilder.group({
      email: ['john.doe@mailinator.com', [
        Validators.required,
        Validators.email
      ]],
      password: ['@ngular2+', Validators.required]
    });
  }

}
