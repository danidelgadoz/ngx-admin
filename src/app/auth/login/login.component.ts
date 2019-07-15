import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../core/services/auth.service';
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
    private authService: AuthService,
    public snackBar: MatSnackBar
  ) {
    this.form = formBuilder.group({
      email: ['', [
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
    this.updateContratoSubscription = this.authService
      .loginWithUserCredentials(this.form.value.email, this.form.value.password)
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
