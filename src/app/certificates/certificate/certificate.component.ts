import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Certificate } from 'src/app/models/certificate';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {
  @Input('certificate-card') certificate: Certificate;

  constructor(private elRef:ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    let div = this.elRef.nativeElement.querySelector('.card');
    setTimeout(function () {
      div.style.opacity = 1;
    }, 500);
  }
}
