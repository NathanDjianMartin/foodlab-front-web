import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../../services/user/user.service";
import {LocalStorageService} from "../../services/local-storage/local-storage.service";
import {LoggerService} from "../../services/logger/logger.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuardGuard implements CanActivate {

  constructor(
      private userService: UserService,
      private localStorageService: LocalStorageService,
      private loggerService: LoggerService,
      private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userService.isLoggedIn() == false) {
      this.loggerService.displayError('You must be logged in to access this page.');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
