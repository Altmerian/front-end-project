import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import passwordCheckValidator from '../../shared/pswd-check.directive';
import { MessageService } from 'src/app/shared/services/message.service';
import { UserService } from 'src/app/users/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { AlertComponent } from 'src/app/shared/dialogs/alert/alert.component';
import { Credentials } from 'src/app/shared/models/credentials';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  registerForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    rptPassword: [''],
    firstName: [''],
    lastName: [''],
  });

  get password(): AbstractControl {
    return this.registerForm.get('password');
  }

  get rptPassword(): AbstractControl {
    return this.registerForm.get('rptPassword');
  }

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this._initEmailAutocomplete();
    this.rptPassword.setValidators([Validators.required, passwordCheckValidator('password')]);
    this.rptPassword.updateValueAndValidity();
  }

  addUser(): void {
    const user = this._parseFormValues();
    this.userService.createUser(user).subscribe(resp => {
      console.log(resp);
      if (resp.status === 201) {
        user.id = resp.headers.get('Location').replace(/^.*[\\\/]/, '');
        this._openDialog(user);
        this.userService.login(new Credentials(user.email, user.password))
          .subscribe(response => this.userService.authorizeUser(response.body.jwtToken));
      }
    }, error => {
      const message = (error.error.messages as Array<string>).join('; ');
      this.messageService.errorMessage(message);
      console.log(error);
    });
  }

  private _parseFormValues(): User {
    const user = new User();
    user.email = this.registerForm.value.email;
    user.password = this.registerForm.value.password;
    user.firstName = this.registerForm.value.firstName;
    user.lastName = this.registerForm.value.lastName;
    return user;
  }

  private _openDialog(user: User): void {
    const loginAlert = this.dialog.open(AlertComponent, {
      data: {
        title: 'Successful registration',
        content: `New user has been added to the system: "${user.email}", id=${user.id}.\r\n
        You have been logged in as ${user.email}`,
        buttonLabel: 'Ok'
      }
    });
    loginAlert.afterClosed().subscribe(_ => this.router.navigate(['/home']));
  }

  // autofill email field in register form with login value
  private _initEmailAutocomplete(): void {
    const login = document.getElementById('login') as HTMLInputElement;
    const email = document.getElementById('email') as HTMLInputElement;
    login.addEventListener('input', () => {
      email.value = login.value;
    });
  }
}
