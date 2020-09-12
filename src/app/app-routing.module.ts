import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CertificateNewComponent } from './certificates/certificate-new/certificate-new.component';
import { CertificateDetailsComponent } from './certificates/certificate-details/certificate-details.component';
import { OrderComponent } from './orders/order/order.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { CertificateEditComponent } from './certificates/certificate-edit/certificate-edit.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { OrderListComponent } from './orders/order-list/order-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'certificate', component: CertificateNewComponent },
  { path: 'certificate/:id', component: CertificateDetailsComponent },
  { path: 'certificate/:id/edit', component: CertificateEditComponent, canActivate: [AuthGuard] },
  { path: 'user', loadChildren: () => import('./users/user.module').then(m => m.UserModule) },
  { path: 'order', component: OrderComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'orders/:id', component: OrderDetailsComponent },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
