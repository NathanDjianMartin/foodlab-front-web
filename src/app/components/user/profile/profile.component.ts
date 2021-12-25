import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../models/user/user";
import {UserService} from "../../../services/user/user.service";
import {LocalStorageService} from "../../../services/local-storage/local-storage.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() user!: User;

  constructor(
      private userService: UserService,
      private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    const jwt: string | null = this.localStorageService.get('jwt');
    if (jwt !== null) {
      this.userService.getProfile(jwt).subscribe({
        next: (data) => {
          this.user = JSON.parse(JSON.stringify(data));
        },
        error: (err) => {
          alert(`Error: ${err.error.message}`);
        }
      });
    } else {
      alert('Error: jwt is null');
    }
  }

  logout() {
    this.userService.logout();
  }

}
