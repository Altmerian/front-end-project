import { Component, OnInit, Input, ElementRef, AfterViewInit } from '@angular/core';
import { Certificate } from 'src/app//shared/models/certificate';
import { OrderService } from 'src/app/orders/order.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit, AfterViewInit {
  @Input('certificate-card') certificate: Certificate;

  constructor(
    private elRef: ElementRef,
    private orderService: OrderService,
    ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const div = this.elRef.nativeElement.querySelector('.card');
    setTimeout(() => {
      div.style.opacity = 1;
    }, 500);
  }

  addToOrder(): void {
    this.orderService.addCertificate(this.certificate);
  }
}
