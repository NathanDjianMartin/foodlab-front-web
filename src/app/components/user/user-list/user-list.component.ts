import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../models/user/user";
import {UserService} from "../../../services/user/user.service";
import {LocalStorageService} from "../../../services/local-storage/local-storage.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input() users: User[] = []

  constructor(
      private userService: UserService,
      private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
  }

  deleteUser(): void {
    alert('TODO');
  }
}
