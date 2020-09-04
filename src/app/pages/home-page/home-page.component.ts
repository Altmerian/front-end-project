import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { CertificateService } from 'src/app/certificates/certificate.service';
import { CertificatesListComponent } from 'src/app/certificates/certificates-list/certificates-list.component';
import { Certificate } from 'src/app/models/certificate';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  certificates: Certificate[] = [];
  certificatesToShow: Certificate[] = [];
  loading: boolean = false;
  emptySearch: boolean = false;
  readonly PAGE_SIZE = 10;
  private currentPage: number = 1;
  private timeoutId: number;

  constructor(private certificateService: CertificateService) {
    certificateService.certificates$.subscribe(data => {
      this.currentPage = 1;
      this.certificates = data;
      this.certificatesToShow = data.slice(0, this.PAGE_SIZE);
      this.emptySearch = (data.length) ? false : true;
    });
  }

  ngOnInit(): void {
    this.certificateService.getCertificates(1, 100).subscribe(data => {
      this.certificates = data;
      this.certificatesToShow = data.slice(0, this.PAGE_SIZE);
    })
  }

  ngAfterViewInit() {
    document.querySelector('.scroll-top').addEventListener(
      'click', () => window.scrollTo(0, 0));
  }

  @HostListener('window:scroll', ['$event'])
  scroll(event: Event) {
    if (this.checkMoreContent()) {
      this.loading = true;
    }
    let checkWindowScroll = this.checkWindowScroll.bind(this);
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(checkWindowScroll, 500);
  }

  checkWindowScroll(event: Event) {
    if (((window.pageYOffset + document.documentElement.clientHeight + 50) >=
      document.documentElement.scrollHeight) && this.checkMoreContent()) {
      this.currentPage++;
      this.showMoreContent();
    } else {
      this.loading = false;
    }
  }

  checkMoreContent(): boolean {
    if (this.PAGE_SIZE * this.currentPage < this.certificates.length) {
      return true;
    }
    return false;
  }

  showMoreContent() {
    const startIndex = (this.currentPage - 1) * this.PAGE_SIZE;
    let createContent = this.createContent.bind(this);
    setTimeout(createContent, 700, startIndex)
  }

  createContent(startIndex: number) {
    this.loading = false;
    const newContent = this.certificates.slice(startIndex, startIndex + this.PAGE_SIZE)
    this.certificatesToShow.push(...newContent);
  }
}
