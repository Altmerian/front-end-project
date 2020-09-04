import { Component, OnInit, HostListener } from '@angular/core';
import { CertificateService } from 'src/app/certificates/certificate.service';
import { Certificate } from 'src/app/models/certificate';
import { filter, takeUntil } from 'rxjs/operators';
import { RouterEvent, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';

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
  public destroyed = new Subject<any>();

  constructor(
    private certificateService: CertificateService,
    private router: Router,
    ) {
    certificateService.certificates$.subscribe(data => {
      this.currentPage = 1;
      this.certificates = data;
      this.certificatesToShow = data.slice(0, this.PAGE_SIZE);
      this.emptySearch = (data.length) ? false : true;
    });
  }

  ngOnInit(): void {
    this.fetchData();
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      takeUntil(this.destroyed)
    ).subscribe(() => {
      this.fetchData();
      this.certificateService.searchTerm$.next('');
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  private fetchData() {
    this.certificateService.getCertificates(1, 100).subscribe(data => {
      this.certificates = data;
      this.certificatesToShow = data.slice(0, this.PAGE_SIZE);
    });
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
    setTimeout(createContent, 500, startIndex)
  }

  createContent(startIndex: number) {
    this.loading = false;
    const newContent = this.certificates.slice(startIndex, startIndex + this.PAGE_SIZE)
    this.certificatesToShow.push(...newContent);
  }
}
