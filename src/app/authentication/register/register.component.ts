import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { ErrorStateMatcher } from '@angular/material/core';

import { AuthenticationService } from '../authentication.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const password = control.parent.get('password').value;
    const confirmation = control.parent.get('passwordConfirmation').value;
    const match = password !== confirmation;

    return (control && control.dirty && match) || (control && control.touched && control.invalid);
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../login/login.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  matcher = new MyErrorStateMatcher();
  public registerSubscription: Subscription;
  public registered: Boolean;

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    public snackBar: MatSnackBar
  ) {
    this.form = formBuilder.group({
      email: ['', [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]],
      codigo: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  ngOnInit() {
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const confirmPass = group.controls.passwordConfirmation.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  registerUser() {
    this.registerSubscription = this.authenticationService
      .register(this.form.value)
      .subscribe(
        data => {
          this.registered = true;
        },
        error => {
          this.snackBar.open('Error de registro, vuelve a intentarlo', '', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom'
          });
        }
      );
  }
}
