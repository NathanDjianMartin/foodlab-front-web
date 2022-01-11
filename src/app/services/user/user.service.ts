import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Credentials} from "../../models/user/credentials";
import {Router} from "@angular/router";
import {LocalStorageService} from "../local-storage/local-storage.service";
import {User} from "../../models/user/user";
import {LoggerService} from "../logger/logger.service";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
      private httpClient: HttpClient,
      private localStorageService: LocalStorageService,
      private loggerService: LoggerService,
      private router: Router
  ) { }

  login(credentials: Credentials) {
    this.httpClient.post(`${environment.apiUrl}/auth/login`, credentials).subscribe({
      next: (data) => {
        const token: string = JSON.parse(JSON.stringify(data)).access_token;
        this.localStorageService.set('jwt', token);
        this.router.navigate(['/profile']).then((successful) => {
          this.loggerService.displaySuccess(`Successfully logged in!`);
        }).catch((err) => {
          this.loggerService.displayError(`Error while navigating to profile page: ${err.error.message}`);
        });
      },
      error: (err) => {
        if(err.error.message == "Unauthorized"){
          this.loggerService.displayError("Incorrect credentials!");
        } else {
          this.loggerService.displayError(`Could not log in: ${err.error.message}`);
        }
      }
    });
  }

  logout() {
    this.localStorageService.remove('jwt');
    this.router.navigate(['']);
  }

  getProfile() {
    return this.httpClient.get<User>(`${environment.apiUrl}/user/profile`);
  }

  /*
  isLoggedIn() {
    return this.localStorageService.get('jwt') !== null;
  }

   */

  isLoggedIn(): Observable<boolean> {
    return new Observable<boolean>(observable => {
      this.getProfile().subscribe({
        next: (profile) => {
          observable.next(true);
        }, error: (err) => {
          observable.next(false);
        }
      });
    });
  }

  isAdmin(): Observable<boolean> {
    return new Observable<boolean>(observable => {
      this.getProfile().subscribe({
        next: (profile) => {
          const user: User = JSON.parse(JSON.stringify(profile));
          if (user.isAdmin) {
            observable.next(true);
          } else {
            observable.next(false);
          }
        }, error: (err) => {
          observable.next(false);
        }
      });
    });
  }

  findAll() {
    return this.httpClient.get(`${environment.apiUrl}/user`);
  }

  create(user: User) {
    return this.httpClient.post(`${environment.apiUrl}/user`, { ...user });
  }

  delete(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/user/${id}`)
  }
}
