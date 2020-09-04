import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CertificatesListComponent } from './certificates-list/certificates-list.component';
import { CertificateComponent } from './certificate/certificate.component';
import { CertificateNewComponent } from './certificate-new/certificate-new.component';

@NgModule({
  declarations: [
    CertificatesListComponent,
    CertificateComponent,
    CertificateNewComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CertificatesListComponent,
  ]
})
export class CertificateModule { }
