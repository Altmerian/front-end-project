import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { UserService } from '../../users/user.service';
import { AlertComponent } from '../../shared/dialogs/alert/alert.component';
import { Credentials } from 'src/app/shared/models/credentials';
import { MessageService } from 'src/app/shared/message.service';
import { CertificateService } from 'src/app/certificates/certificate.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private userService: UserService,
    private certificateService: CertificateService,
    private messageService: MessageService,
    private location: Location,
  ) { }

  ngOnInit(): void {
  }

  login() {
    const credentials: Credentials = this.loginForm.value;
    this.userService.login(credentials).subscribe(resp => {
      console.log(resp.status);
      if (resp.status == 200) {
        const token = resp.body['jwtToken'];
        this.userService.authorizeUser(token);
        this._openDialog(credentials);
      }
    }, error => {
      console.log(error);
      // this.messageService.errorMessage('Invalid email or password.');
    })
  }

  private _openDialog(credentials: Credentials) {
    const loginAlert = this.dialog.open(AlertComponent, {
      data: {
        title: 'Successfully login',
        content: `You have been logged in as ${credentials.email}`,
        buttonLabel: 'Go back'
      }
    });
    loginAlert.afterClosed().subscribe(_ => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
