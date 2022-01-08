import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Credentials} from "../../models/user/credentials";
import {Router} from "@angular/router";
import {LocalStorageService} from "../local-storage/local-storage.service";
import {User} from "../../models/user/user";
import {LoggerService} from "../logger/logger.service";

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
    this.httpClient.post('http://localhost:3000/auth/login', credentials).subscribe({
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
        this.loggerService.displayError(`Could not log in: ${err.error.message}`);
      }
    });
  }

  logout() {
    this.localStorageService.remove('jwt');
    this.router.navigate(['login']);
  }

  getProfile(jwt: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    });
    return this.httpClient.get('http://localhost:3000/user/profile', { headers: headers });
  }

  findAll(jwt: string) {
    // TODO stop getting jwt as a parameter (use localStorageService instead)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    });
    return this.httpClient.get('http://localhost:3000/user', { headers: headers });
  }

  create(user: User, jwt: string) {
    // TODO stop getting jwt as a parameter (use localStorageService instead)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.localStorageService.get('jwt')}`
    });
    return this.httpClient.post('http://localhost:3000/user', { ...user }, { headers: headers });
  }

  delete(id: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.localStorageService.get('jwt')}`
    });
    return this.httpClient.delete(`http://localhost:3000/user/${id}`, { headers: headers })
  }
}
