import { Injectable } from '@angular/core';
import * as M from "materialize-css";

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }


  displayError(message: string){
    M.toast({html: message, classes: 'rounded loggerError'})
  }

  displaySuccess(message: string){
    M.toast({html: message, classes: 'toast rounded loggerSuccess'})
  }
}
