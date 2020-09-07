import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { UserService } from '../../users/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../dialogs/alert/alert.component';
import { Credentials } from 'src/app/models/credentials';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
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
        const loginAlert = this.dialog.open(AlertComponent, {
          data: {
            title: 'Successfully login',
            content: `You have been entered into the system as ${credentials.email}`,
            buttonLabel: `Go back`
          }
        });
        loginAlert.afterClosed().subscribe(_ => this.goBack());
      } else {
        console.log('Invalid credentials');
      }
    }, error => {
      console.log(error);
    })
  }

  goBack(): void {
    this.location.back();
  }

}
