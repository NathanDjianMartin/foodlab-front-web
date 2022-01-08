import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Credentials} from "../../../models/user/credentials";
import * as bcrypt from "bcryptjs";
import {LoggerService} from "../../../services/logger/logger.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup!: FormGroup;

  constructor(
      private userService: UserService,
      private loggerService: LoggerService,
      private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login(): void {
    if (this.loginFormGroup.valid) {
      const email = this.loginFormGroup.get('email')?.value;
      const password = this.loginFormGroup.get('password')?.value;
      let credentials = new Credentials(
          email,
          password
      )
      this.userService.login(credentials);
    } else {
      this.loggerService.displayError('Please fill in the login form correctly.');
    }
  }
}
