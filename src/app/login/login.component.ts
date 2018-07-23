import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';

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
      email: ['admin@craftimes.com', [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]],
      password: ['123456', Validators.required]
    });
  }

  ngOnInit() {
  }

  loginUser(value: any ) {
    console.log(this.form.value);

    this.loginService.login(this.form.value.email, this.form.value.password)
      .subscribe(
        data => {
          console.log('Authorized', data);
        },
        error => {
          console.error('Unauthorized', error);
        }
      );
  }

}
