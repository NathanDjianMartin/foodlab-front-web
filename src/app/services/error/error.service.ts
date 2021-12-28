import { Injectable } from '@angular/core';
import * as M from 'materialize-css';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  message!: string;

  constructor() { }

  log(message: string){
    this.message = message;
  }

  displayToats(message: string){
    M.toast({html: message, classes: 'red darken-4 rounded'})
  }
}
