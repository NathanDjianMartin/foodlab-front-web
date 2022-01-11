import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../../services/user/user.service";


/**
 * This guard sole purpose is to redirect the user to the recipes page if he is logged in
 * or to the login page if he is not logged in when he goes on the '/' route.
 */
@Injectable({
  providedIn: 'root'
})
export class LoginRedirectGuard implements CanActivate {

  constructor(
      private userService: UserService,
      private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.userService.isLoggedIn().subscribe({
      next: (isLoggedIn) => {
        if (isLoggedIn) {
          this.router.navigate(['recipes']);
        } else {
          this.router.navigate(['login']);
        }
      }, error: (err) => {
        this.router.navigate(['login']);
      }
    });
    return true;
  }
  
}
