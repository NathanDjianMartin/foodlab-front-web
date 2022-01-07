import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Credentials} from "../../models/user/credentials";
import {Router} from "@angular/router";
import {LocalStorageService} from "../local-storage/local-storage.service";
import {User} from "../../models/user/user";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
      private httpClient: HttpClient,
      private localStorageService: LocalStorageService,
      private router: Router
  ) { }

  login(credentials: Credentials) {
    this.httpClient.post(`${environment.apiUrl}/auth/login`, credentials).subscribe({
      next: (data) => {
        const token: string = JSON.parse(JSON.stringify(data)).access_token;
        this.localStorageService.set('jwt', token);
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        alert(`Error during login request: ${err.error.message}`);
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
    return this.httpClient.get(`${environment.apiUrl}/user/profile`, { headers: headers });
  }

  findAll(jwt: string) {
    // TODO stop getting jwt as a parameter (use localStorageService instead)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    });
    return this.httpClient.get(`${environment.apiUrl}/user`, { headers: headers });
  }

  create(user: User, jwt: string) {
    // TODO stop getting jwt as a parameter (use localStorageService instead)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.localStorageService.get('jwt')}`
    });
    return this.httpClient.post(`${environment.apiUrl}/user`, { headers: headers, ...user });
  }

  delete(id: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.localStorageService.get('jwt')}`
    });
    return this.httpClient.delete(`${environment.apiUrl}/user/${id}`, { headers: headers })
  }
}
