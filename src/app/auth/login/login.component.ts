import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../core/services/auth.service';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: string;

  public loginSubscription: Subscription;
  public loginLoading = false;

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public snackBar: MatSnackBar
  ) {
    this.form = formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
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

}
