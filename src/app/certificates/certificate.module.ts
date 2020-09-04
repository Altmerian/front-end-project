import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CertificatesListComponent } from './certificates-list/certificates-list.component';
import { CertificateComponent } from './certificate/certificate.component';

@NgModule({
  declarations: [
    CertificatesListComponent,
    CertificateComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CertificatesListComponent,
  ]
})
export class CertificateModule { }
