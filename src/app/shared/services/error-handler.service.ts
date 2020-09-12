import { Injectable, ErrorHandler, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { NotFoundError } from '../errors/notFoundError';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor(
    private router: Router,
    private ngZone: NgZone,
  ) { }

  handleError(error: any): void {
    console.log(error);
    if (error instanceof NotFoundError) {
      this.ngZone.run(() => {
        this.router.navigate(['/error'],
          { state: { status: 404, text: error.message } });
      });
    }
  }
}
