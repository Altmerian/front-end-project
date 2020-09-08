import { Injectable } from '@angular/core';
import { AlertComponent } from "../dialogs/alert/alert.component";
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private dialog: MatDialog,
  ) { }

  errorMessage(message: string) {
    this._openDialog(message);
  }

  private _openDialog(messages: string) {
    const loginAlert = this.dialog.open(AlertComponent, {
      data: {
        title: 'Failure',
        content: messages,
        buttonLabel: 'Ok'
      }
    });
  }

}
