import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {LocalStorageService} from "../../services/local-storage/local-storage.service";
import {LoggerService} from "../../services/logger/logger.service";
import {UserService} from "../../services/user/user.service";
import {User} from "../../models/user/user";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
      private userService: UserService,
      private localStorageService: LocalStorageService,
      private loggerService: LoggerService
  ) {
  }


  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> {
    return new Observable<boolean>(observable => {
      this.userService.getProfile().subscribe({
        next: (data) => {
          const user: User = JSON.parse(JSON.stringify(data));
          if (user.isAdmin) {
            observable.next(true);
          } else {
            this.loggerService.displayError('You must be an admin to access this page!');
            observable.next(false);
          }
        },
        error: (err) => {
          this.loggerService.displayError(`Error while loading your profile : ${err.error.message}`);
          observable.next(false);
        }
      });
    });
  }
}
