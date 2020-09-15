import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AlertComponent } from '../dialogs/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private dialog: MatDialog,
  ) { }

  errorMessage(message: string): void {
    this._openDialog('Failure', message, 'Ok', true);
  }

  message(title: string, message: string, label: string): void {
    this._openDialog(title, message, label, false);
  }

  autoHideMessage(heading: string, message: string): void {
    const autoHide = this.dialog.open(AlertComponent, {
      data: {
        title: heading,
        content: message,
        buttonLabel: 'Ok',
        error: false,
      }
    });
    setTimeout(() => autoHide.close(), 1500);
  }

  private _openDialog(heading: string, message: string, label: string = 'Ok', isError: boolean = false): void {
    const loginAlert = this.dialog.open(AlertComponent, {
      data: {
        title: heading,
        content: message,
        buttonLabel: label,
        error: isError,
      }
    });
  }

}
