import { Injectable } from '@angular/core';
import * as M from "materialize-css";

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }


  displayError(message: string){
    M.toast({html: message, classes: 'red darken-4 rounded'})
  }

  displaySuccess(message: string){
    M.toast({html: message, classes: 'toast green darken-4 rounded'})
  }
}
