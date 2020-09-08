import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import passwordCheckValidator from "../../shared/pswd-check.directive";
import { MessageService } from 'src/app/shared/message.service';
import { UserService } from 'src/app/users/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AlertComponent } from 'src/app/dialogs/alert/alert.component';
import { Credentials } from 'src/app/models/credentials';

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

  get password() {
    return this.registerForm.get('password');
  }

  get rptPassword() {
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

  addUser() {
    const user = this._parseFormValues();
    this.userService.createUser(user).subscribe(resp => {
      console.log(resp);
      if (resp.status === 201) {
        user.id = resp.headers.get('Location').replace(/^.*[\\\/]/, '');
        this._openDialog(user);
        this.userService.login(new Credentials(user.email, user.password))
          .subscribe(resp => console.log(`Login as ${user.email}: ${resp.ok}`))
      }
    }, error => {
      const message = (error.error.messages as Array<string>).join('; ');
      this.messageService.errorMessage(message);
      console.log(error);
    })
  }

  private _parseFormValues() {
    const user = new User();
    user.email = this.registerForm.value.email;
    user.password = this.registerForm.value.password;
    user.firstName = this.registerForm.value.firstName;
    user.lastName = this.registerForm.value.lastName;
    return user;
  }

  private _openDialog(user: User) {
    const loginAlert = this.dialog.open(AlertComponent, {
      data: {
        title: 'Successful registration',
        content: `New user has been added to the system as "${user.email}" with id=${user.id}.
        You have been logged in as ${user.email}`,
        buttonLabel: 'Ok'
      }
    });
    loginAlert.afterClosed().subscribe(_ => this.router.navigate(['/home']));
  }

  // autofill email field in register form with login value
  private _initEmailAutocomplete() {
    const login = document.getElementById('login') as HTMLInputElement;
    const email = document.getElementById('email') as HTMLInputElement;
    login.addEventListener('input', function () {
      email.value = login.value;
    });
  }


}
