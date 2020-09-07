import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from the service.
    const authToken = sessionStorage.getItem('authToken');

    if (authToken) {
      // Clone the request and set the new header in one step.
      const authReq = request.clone({ setHeaders: { Authorization: authToken } });
      return next.handle(authReq);
    }

    return next.handle(request);
  }
}
