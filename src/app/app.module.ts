import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { httpInterceptorProviders } from './http-interceptors/interceptors';
import { CertificateModule } from './certificates/certificate.module';
import { OrderModule } from './orders/order.module';
import { TagModule } from './tags/tag.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AlertComponent } from './dialogs/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TagModule,
    CertificateModule,
    OrderModule,
    SharedModule,
  ],
  providers: [
    httpInterceptorProviders,
  ],
  entryComponents: [
    AlertComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
