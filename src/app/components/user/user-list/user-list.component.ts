import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user/user";
import {UserService} from "../../../services/user/user.service";
import {LocalStorageService} from "../../../services/local-storage/local-storage.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users?: User[]

  constructor(
      private userService: UserService,
      private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
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

  deleteUser(): void {
    alert('TODO');
  }
}
