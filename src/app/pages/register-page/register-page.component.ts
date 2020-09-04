import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.initEmailAutocomplete();
  }

  // autofill email field in register form with login value
  private initEmailAutocomplete() {
    const login = document.getElementById('login') as HTMLInputElement;
    const email = document.getElementById('email') as HTMLInputElement;
    login.addEventListener('input', function () {
      email.value = login.value;
    });
  }
}
