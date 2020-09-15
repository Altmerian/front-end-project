import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { httpInterceptorProviders } from './shared/http-interceptors/interceptors';
import { CertificateModule } from './certificates/certificate.module';
import { OrderModule } from './orders/order.module';
import { TagModule } from './tags/tag.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AlertComponent } from './shared/dialogs/alert/alert.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { ErrorHandlerService } from './shared/services/error-handler.service';
import { ConfirmComponent } from './shared/dialogs/confirm/confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    ErrorPageComponent,
    AlertComponent,
    ConfirmComponent,
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
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService
    }
  ],
  entryComponents: [
    AlertComponent,
    ConfirmComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
