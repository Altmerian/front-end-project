import { Component, ViewChildren, QueryList, Input, AfterViewInit, OnInit } from '@angular/core';
import { MatMenuTrigger, _MatMenu } from '@angular/material/menu';
import debounce from 'lodash.debounce';

import { CertificateService } from '../../certificates/certificate.service';
import { TagService } from '../../tags/tag.service';
import { Tag } from '../models/tag';
import { UserService } from '../../users/user.service';
import { OrderService } from 'src/app/orders/order.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit, OnInit {
  isFavorite = false;
  tags: Tag[] = [];
  tagSearch: string;
  readonly apiDocsUrl: string;
  @Input() isHomePage: boolean;
  @ViewChildren(MatMenuTrigger) tagMenuTrigger: QueryList<MatMenuTrigger>;

  constructor(
    private certificateService: CertificateService,
    private tagService: TagService,
    public userService: UserService,
    public orderService: OrderService,
  ) {
    this.apiDocsUrl = environment.apiUrl + '/swagger-ui/';
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.isHomePage) {
      this.tagService.getTags(1, 10).subscribe(data => this.tags = data);
      const searchElement = document.getElementById('searchPanel');
      searchElement.addEventListener('input',
        debounce(this.certificateService.searchCertificatesRef, 1000));
    }
  }

  searchByTag(event: Event): void {
    const searchElement = document.getElementById('searchPanel');
    (searchElement as HTMLInputElement).value = '';

    const target = event.currentTarget as HTMLElement;
    if (target.tagName === 'FORM') {
      event.preventDefault();
      this.tagMenuTrigger.last.closeMenu();
    } else {
      this.tagSearch = target.textContent.trim();
    }

    this.certificateService.searchCertificatesByTag(this.tagSearch);
    console.log('search by tag... ' + this.tagSearch);
    this.tagSearch = '';
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

  logout(): void {
    this.userService.logout();
    this.orderService.currentOrder = [];
    this.orderService.order$.next([]);
  }
}
