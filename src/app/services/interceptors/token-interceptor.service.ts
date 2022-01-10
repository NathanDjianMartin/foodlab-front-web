import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {LocalStorageService} from "../local-storage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(
      private localStorageService: LocalStorageService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = this.localStorageService.get('jwt');
    if (jwt != null) {
      return next.handle(req.clone({
        headers: req.headers.set('Authorization', `Bearer ${jwt}`)
      }));
    }
    return next.handle(req);
  }
}
