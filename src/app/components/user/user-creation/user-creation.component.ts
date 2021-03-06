import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/user/user";
import {LocalStorageService} from "../../../services/local-storage/local-storage.service";
import * as bcrypt from 'bcryptjs';
import {LoggerService} from "../../../services/logger/logger.service";

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent implements OnInit {

  userCreationForm!: FormGroup;
  users: User[] = [];
  isPasswordVisible: boolean = false;
  isUserCreationFormVisible: boolean = false;

  constructor(
      private userService: UserService,
      private localStorageService: LocalStorageService,
      private loggerService: LoggerService,
      private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.fetchUserList();
  }

  createUser(): void {
    if (this.userCreationForm.valid) {
      const name = this.userCreationForm.get('name')?.value;
      const email = this.userCreationForm.get('email')?.value;
      const password = bcrypt.hashSync(this.userCreationForm.get('password')?.value, 8);
      const isAdmin = this.userCreationForm.get('isAdmin')?.value;
      const user = new User(name, email, password, isAdmin);

      this.userService.create(user).subscribe({
        next: (data) => {
          this.userCreationForm.reset();
          this.users.push(user);
          this.initForm();
          this.loggerService.displaySuccess(`User ${name} successfully created!`);
        },
        error: (err) => {
          this.loggerService.displayError(`Error while creating user: ${err.error.message}`);
        }
      });
    } else {
      this.loggerService.displayError('You must be logged in to create a user!');
    }
  }

  fetchUserList(): void {
    this.userService.findAll().subscribe({
      next: (data) => {
        this.users = JSON.parse(JSON.stringify(data));
      },
      error: (err) => {
        this.loggerService.displayError(`Error while fetching users list: ${err.error.message}`);
      }
    });
  }

  initForm(): void {
    this.userCreationForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      isAdmin: [false, []]
    });
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleUserCreationForm(): void {
    this.isUserCreationFormVisible = !this.isUserCreationFormVisible;
  }
}
