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

  deleteUser(id: number): void {

    this.userService.delete(id).subscribe({
      next: (data) => {
        // removes the user from the users array
        const deletedUserIndex = this.users.indexOf(this.users.find(user => user.id == id)!);
        this.users.splice(deletedUserIndex, 1);
        alert(`User successfully deleted!`);
      },
      error: (err) => {
        alert(`Error while deleting a user: ${err.message}`);
      }
    });
  }
}
