import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AlertComponent } from "./dialogs/alert/alert.component";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private dialog: MatDialog,
  ) { }

  errorMessage(message: string) {
    this._openDialog('Failure', message, 'Ok', true);
  }

  message(title: string, message: string, label: string) {
    this._openDialog('Failure', message, 'Ok');
  }

  private _openDialog(heading: string, message: string, label: string = 'Ok', isError: boolean = false) {
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
