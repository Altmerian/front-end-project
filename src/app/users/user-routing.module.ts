import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import { LoginPageComponent } from '../pages/login-page/login-page.component';
import { RegisterPageComponent } from '../pages/register-page/register-page.component';
import { OrderListComponent } from '../orders/order-list/order-list.component';
import { OrderDetailsComponent } from '../orders/order-details/order-details.component';


const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: ':id/orders', component: OrderListComponent },
  { path: ':userId/orders/:id', component: OrderDetailsComponent },
  { path: ':id', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
