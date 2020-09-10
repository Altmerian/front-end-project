import { Component, ViewChildren, QueryList, Input, AfterViewInit, OnInit } from '@angular/core';
import { MatMenuTrigger, _MatMenu } from '@angular/material/menu';
import debounce from 'lodash.debounce'

import { CertificateService } from '../../certificates/certificate.service'
import { TagService } from '../../tags/tag.service';
import { Tag } from '../models/tag';
import { UserService } from '../../users/user.service';
import { User } from '../models/user';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit, OnInit {
  currentUser: User;
  isFavorite: boolean = false;
  tags: Tag[] = [];
  tagSearch: string;
  @Input() isHomePage: boolean;
  @ViewChildren(MatMenuTrigger) tagMenuTrigger: QueryList<MatMenuTrigger>;

  constructor(
    private certificateService: CertificateService,
    private tagService: TagService,
    public userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.isHomePage) {
      this.tagService.getTags(1, 10).subscribe(data => this.tags = data);
      const searchElement = document.getElementById('searchPanel');
      searchElement.addEventListener('input',
        debounce(this.certificateService.searchCertificatesRef, 1000));
    }
  }

  searchByTag(event: Event) {
    //clear certificate name/description text
    const searchElement = document.getElementById('searchPanel');
    (searchElement as HTMLInputElement).value = '';

    let target = event.currentTarget;
    if (target['tagName'] === 'FORM') {
      event.preventDefault();
      this.tagMenuTrigger.last.closeMenu();
    } else {
      this.tagSearch = target['textContent'].trim();
    }

    this.certificateService.searchCertificatesByTag(this.tagSearch);
    console.log('search by tag... ' + this.tagSearch);
    this.tagSearch = '';
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  logout() {
    this.userService.logout();
  }
}
