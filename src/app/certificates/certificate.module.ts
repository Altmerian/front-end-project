import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { CertificatesListComponent } from './certificates-list/certificates-list.component';
import { CertificateComponent } from './certificate/certificate.component';
import { CertificateNewComponent } from './certificate-new/certificate-new.component';
import { CertificateDetailsComponent } from './certificate-details/certificate-details.component';
import { CertificateEditComponent } from './certificate-edit/certificate-edit.component';

@NgModule({
  declarations: [
    CertificatesListComponent,
    CertificateComponent,
    CertificateNewComponent,
    CertificateDetailsComponent,
    CertificateEditComponent,
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
  ],
  exports: [
    CertificatesListComponent,
  ]
})
export class CertificateModule { }
