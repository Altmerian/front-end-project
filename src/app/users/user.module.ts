import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';
import { LoginPageComponent } from '../pages/login-page/login-page.component';
import { RegisterPageComponent } from '../pages/register-page/register-page.component';


@NgModule({
  declarations: [
    UserComponent,
    LoginPageComponent,
    RegisterPageComponent,
  ],
  imports: [
    SharedModule,
    UserRoutingModule,
  ]
})
export class UserModule { }
