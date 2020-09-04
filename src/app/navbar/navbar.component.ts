import { Component, OnInit, ViewChildren, QueryList, ViewChild, ElementRef } from '@angular/core';
import { MatMenuTrigger, _MatMenu } from '@angular/material/menu';
import { CertificateService } from '../certificates/certificate.service'
import { TagService } from '../tags/tag.service';
import { Tag } from '../models/tag';
import debounce from 'lodash.debounce'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isFavorite: boolean = false;
  tags: Tag[] = [];
  tagSearch: string;
  @ViewChild('categories') tagMenu: _MatMenu;
  @ViewChildren(MatMenuTrigger) tagMenuTrigger: QueryList<MatMenuTrigger>;

  constructor(
    private certificateService: CertificateService,
    private tagService: TagService,
  ) { }

  ngOnInit(): void {
    this.tagService.getTags(1, 10).subscribe(data => this.tags = data);
  }

  ngAfterViewInit() {
    const searchElement = document.getElementById('searchPanel');
    searchElement.addEventListener('input',
      debounce(this.certificateService.searchCertificatesRef, 1000));
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
}
