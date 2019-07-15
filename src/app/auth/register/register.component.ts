import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorStateMatcher } from '@angular/material/core';

import { AuthService } from '../../core/services/auth.service';

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

  constructor(

    formBuilder: FormBuilder,
    private authService: AuthService,
    public snackBar: MatSnackBar
  ) {
    this.form = formBuilder.group({
      email: ['cashlessmllosa@yopmail.com', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]],
      codigo: ['1', Validators.required],
      password: ['Awwwwwwwwwwwww1', [
        Validators.required,
        // Validators.minLength(6)
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')
      ]],
      passwordConfirmation: ['Awwwwwwwwwwwww1', Validators.required]
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
    this.registerSubscription = this.authService
      .register(this.form.value)
      .subscribe(
        data => {
          console.log('response at component', data);
        },
        error => {
          console.log('error at component', error);
          this.snackBar.open(`${error.message}`, '', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom'
          });
        }
      );
  }
}
