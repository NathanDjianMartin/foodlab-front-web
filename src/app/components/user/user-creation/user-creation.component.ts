import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/user/user";
import {LocalStorageService} from "../../../services/local-storage/local-storage.service";
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent implements OnInit {

  userCreationForm!: FormGroup;
  users: User[] = []

  constructor(
      private userService: UserService,
      private fb: FormBuilder,
      private localStorageService: LocalStorageService
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

      const jwt: string | null = this.localStorageService.get('jwt');

      if (jwt !== null) {
        this.userService.create(user, jwt).subscribe({
          next: (data) => {
            this.userCreationForm.reset();
            this.users.push(user);
            this.initForm();
            alert(`User ${name} successfully created!`);
          },
          error: (err) => {
            alert(err.error.message);
          }
        });
      } else {
        alert('You must be logged in to create a user!');
      }
    } else {
      alert('The form is invalid!')
    }
  }

  fetchUserList(): void {
    const jwt: string | null = this.localStorageService.get('jwt');
    if (jwt !== null) {
      this.userService.findAll(jwt).subscribe({
        next: (data) => {
          this.users = JSON.parse(JSON.stringify(data));
        },
        error: (err) => {
          alert(`Error: ${err.error.message}`);
        }
      })
    }
  }

  initForm(): void {
    this.userCreationForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      isAdmin: [false, []]
    });
  }
}
