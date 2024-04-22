import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class YInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, 
    next: HttpHandler): 
    Observable<HttpEvent<unknown>> {
      let _jwtToken: any = '';

      const token = localStorage.getItem('access_token')
        ? localStorage.getItem('access_token')
        : '';
  
      if (token) {
        _jwtToken = JSON.parse(token || '') || '';
      }
      // console.log('_jwtToken: ', _jwtToken);
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${_jwtToken}`),
      });
  
      return next.handle(authReq);

  }
}
