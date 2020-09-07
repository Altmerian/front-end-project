import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CertificateNewComponent } from './certificates/certificate-new/certificate-new.component';
import { CertificateDetailsComponent } from './certificates/certificate-details/certificate-details.component';
import { OrderComponent } from './orders/order/order.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'certificate', component: CertificateNewComponent },
  { path: 'order', component: OrderComponent },
  { path: 'user', loadChildren: () => import('./users/user.module').then(m => m.UserModule) },
  { path: 'certificate/:id', component: CertificateDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
