import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  constructor(
      public userService: UserService,
      private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  navigateToHome() {
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['/recipes'])
    } else {
      this.router.navigate([''])
    }
  }
}
