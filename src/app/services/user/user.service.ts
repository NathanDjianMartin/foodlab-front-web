import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Credentials} from "../../models/user/credentials";
import {Router} from "@angular/router";
import {LocalStorageService} from "../local-storage/local-storage.service";

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
    return this.httpClient.post('http://localhost:3000/auth/login', credentials);
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
}
