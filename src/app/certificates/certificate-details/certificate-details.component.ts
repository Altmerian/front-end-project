import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CertificateService } from '../certificate.service';
import { Certificate } from 'src/app/models/certificate';

@Component({
  selector: 'app-certificate-details',
  templateUrl: './certificate-details.component.html',
  styleUrls: ['./certificate-details.component.scss']
})
export class CertificateDetailsComponent implements OnInit {
  certificate: Certificate = new Certificate();

  constructor(
    private route: ActivatedRoute,
    private certificateService: CertificateService,
  ) { }

  ngOnInit(): void {
    this.getCertificate();
  }

  getCertificate(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.certificateService.getCertificate(id).subscribe(resp => {
      this.certificate = resp.body;
    });
  }

  save(): void {
    // this.certificateService.updateCertificate(this.certificate);
  }
}
