import { Component, OnInit, HostListener, OnDestroy, AfterViewInit } from '@angular/core';
import { RouterEvent, NavigationEnd, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CertificateService } from 'src/app/certificates/certificate.service';
import { Certificate } from 'src/app/shared/models/certificate';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy, AfterViewInit {
  certificates: Certificate[] = [];
  certificatesToShow: Certificate[] = [];
  loading = false;
  emptySearch = false;
  destroyed = new Subject<any>();
  readonly PAGE_SIZE = 10;
  private _currentPage = 1;
  private _timeoutId: number;

  constructor(
    private certificateService: CertificateService,
    private router: Router,
    ) {
    certificateService.certificates$.subscribe(data => {
      this._currentPage = 1;
      this.certificates = data;
      this.certificatesToShow = data.slice(0, this.PAGE_SIZE);
      this.emptySearch = (data.length) ? false : true;
    });
  }

  ngOnInit(): void {
    this._fetchData();
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      takeUntil(this.destroyed)
    ).subscribe(() => {
      this._fetchData();
      this.certificateService.searchTerm$.next('');
    });
  }

  ngAfterViewInit(): void {
    document.querySelector('.scroll-top').addEventListener(
      'click', () => window.scrollTo(0, 0));
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  private _fetchData(): void {
    this.certificateService.getCertificates(1, 100).subscribe(data => {
      this.certificates = data;
      this.certificatesToShow = data.slice(0, this.PAGE_SIZE);
    });
  }

  @HostListener('window:scroll', ['$event'])
  scroll(event: Event): void {
    if (this.checkMoreContent()) {
      this.loading = true;
    }
    const checkWindowScroll = this.checkWindowScroll.bind(this);
    clearTimeout(this._timeoutId);
    this._timeoutId = setTimeout(checkWindowScroll, 500);
  }

  checkWindowScroll(event: Event): void {
    if (((window.pageYOffset + document.documentElement.clientHeight + 50) >=
      document.documentElement.scrollHeight) && this.checkMoreContent()) {
      this._currentPage++;
      this.showMoreContent();
    } else {
      this.loading = false;
    }
  }

  checkMoreContent(): boolean {
    if (this.PAGE_SIZE * this._currentPage < this.certificates.length) {
      return true;
    }
    return false;
  }

  showMoreContent(): void {
    const startIndex = (this._currentPage - 1) * this.PAGE_SIZE;
    const createContent = this.createContent.bind(this);
    setTimeout(createContent, 500, startIndex);
  }

  createContent(startIndex: number): void {
    this.loading = false;
    const newContent = this.certificates.slice(startIndex, startIndex + this.PAGE_SIZE);
    this.certificatesToShow.push(...newContent);
  }
}
