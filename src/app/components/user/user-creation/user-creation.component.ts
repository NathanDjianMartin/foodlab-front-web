import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/user/user";
import {LocalStorageService} from "../../../services/local-storage/local-storage.service";

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent implements OnInit {

  userCreationForm!: FormGroup;

  constructor(
      private userService: UserService,
      private fb: FormBuilder,
      private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.userCreationForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      isAdmin: ['']
    });
  }

  createUser(): void {

    const name = this.userCreationForm.get('name')?.value;
    const email = this.userCreationForm.get('email')?.value;
    const password = this.userCreationForm.get('password')?.value;
    const isAdmin = this.userCreationForm.get('isAdmin')?.value;
    const user = new User(name, email, password, isAdmin);

    const jwt: string | null = this.localStorageService.get('jwt');

    if (jwt !== null) {
      this.userService.create(user, jwt).subscribe({
        next: (data) => {
          alert(JSON.parse(JSON.stringify(data)));
        },
        error: (err) => {
          alert(err.error.message);
        }
      });
    } else {
      alert('You must be logged in to create a user!');
    }
  }
}
