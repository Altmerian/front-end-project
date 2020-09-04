import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Certificate } from 'src/app/models/certificate';
import { CertificateComponent } from '../certificate/certificate.component';

@Component({
  selector: 'app-certificates-list',
  templateUrl: './certificates-list.component.html',
  styleUrls: ['./certificates-list.component.scss']
})
export class CertificatesListComponent implements OnInit {
  @ViewChild('container') container: ElementRef;
  @Input('displayedItems') certificates: Certificate[] = [];
  @Input('loadingIcon') loading: boolean;
  @Input() noSearchResults: boolean;
  search: string;

  constructor() { }

  ngOnInit(): void {
  }
}
