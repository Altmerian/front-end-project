import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Certificate } from 'src/app/shared/models/certificate';
import { CertificateService } from '../certificate.service';

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

  constructor(
    private certificateService: CertificateService,
    ) {

  }

  ngOnInit(): void {
    this.certificateService.searchTerm$.subscribe(data => {
      this.search = data.trim();
    });
  }
}
