import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  message!: string;

  constructor() { }

  log(message: string){
    this.message = message;
  }
}
