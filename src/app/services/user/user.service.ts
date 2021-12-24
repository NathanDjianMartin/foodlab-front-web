import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Credentials} from "../../models/user/credentials/credentials";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  login(credentials: Credentials) {
    return this.httpClient.post('http://localhost:3000/auth/login', credentials);
  }
}
