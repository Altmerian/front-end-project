import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private messageService: MessageService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      // retry(1),
      catchError((error: HttpErrorResponse) => {
        let message = '';
        if (error instanceof ErrorEvent) {
          // client-side error
          message = `Error: ${error}`;
          console.log(message);
          this.messageService.errorMessage(message);
        } else {
          // server-side error
          console.log(`status: ${error.status}`);
          message = (error.error.messages as Array<string>).join('; ');
          console.log(message);
          switch (error.status) {
            case 400: {
              this.router.navigate(['/error'],
                { state: { status: 400, text: message } });
              break;
            }
            case 401:
              this.messageService.errorMessage(message);
              break;
            case 403: {
              this.router.navigate(['/error'],
                { state: { status: 403, text: 'forbidden' } });
              break;
            }
            case 404:
            case 500: {
              this.router.navigate(['/error'],
                { state: { status: error.status, text: message } });
              break;
            }
            default: { }
          }
          return throwError(error);
        }
      }));
  }
}
