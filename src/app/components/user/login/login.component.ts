import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Credentials} from "../../../models/user/credentials";
import {ErrorService} from "../../../services/error/error.service";
import {LocalStorageService} from "../../../services/local-storage/local-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup!: FormGroup;

  constructor(
      private userService: UserService,
      private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login(): void {
    let credentials = new Credentials(
        this.loginFormGroup.get('email')?.value,
        this.loginFormGroup.get('password')?.value
    )

    this.userService.login(credentials);
  }
}
