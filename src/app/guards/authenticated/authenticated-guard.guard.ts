import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {User} from "../../models/user/user";
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

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> {
    return new Observable<boolean>(observable => {
      const jwt = this.localStorageService.get('jwt');
      if (jwt !== null) {
        this.userService.getProfile(jwt).subscribe({
          next: (data) => {
            observable.next(true);
          },
          error: (err) => {
            this.loggerService.displayError(`Error while loading profile: ${err.error.message}`);
            observable.next(false);
          }
        });
      } else {
        this.loggerService.displayError('You must be logged in to access this page!');
        observable.next(false);
      }
    });
  }

}
