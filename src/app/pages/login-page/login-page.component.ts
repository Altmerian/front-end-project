import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../users/user.service';
import { AlertComponent } from '../../dialogs/alert/alert.component';
import { Credentials } from 'src/app/models/credentials';
import { MessageService } from 'src/app/shared/message.service';

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
    private messageService: MessageService,
    private location: Location,
  ) { }

  ngOnInit(): void {
  }

  login() {
    const credentials: Credentials = this.loginForm.value;
    console.log(credentials);
    this.userService.login(credentials).subscribe(resp => {
      console.log(resp.status);
      if (resp.status == 200) {
        console.log(resp.body);
        sessionStorage.authToken = 'Bearer ' + resp.body['jwtToken'];
        this._openDialog(credentials);
      } else {
        console.log('Invalid credentials');
      }
    }, error => {
      console.log(error);
      this.messageService.errorMessage('Invalid email or password.');
    })
  }

  private _openDialog(credentials: Credentials) {
    const loginAlert = this.dialog.open(AlertComponent, {
      data: {
        title: 'Successfully login',
        content: `You have been entered into the system as ${credentials.email}`,
        buttonLabel: 'Go back'
      }
    });
    loginAlert.afterClosed().subscribe(_ => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
