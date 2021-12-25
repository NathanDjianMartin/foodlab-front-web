import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {User} from "../../models/user/user";
import {UserService} from "../../services/user/user.service";
import {LocalStorageService} from "../../services/local-storage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuardGuard implements CanActivate {

  constructor(
      private userService: UserService,
      private localStorageService: LocalStorageService,
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
            alert(`Error during getProfile request: ${err.error.message}`);
            observable.next(false);
          }
        });
      } else {
        alert('You must be logged in to access this page!');
        observable.next(false);
      }
    });
  }

}
