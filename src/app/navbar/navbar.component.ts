import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { from } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isFavorite: boolean = false;
  @ViewChildren(MatMenuTrigger) TagMenuTrigger: QueryList<MatMenuTrigger>;

  constructor() { }

  ngOnInit(): void {
  }

  searchByTag(event: Event) {
    event.preventDefault();
    this.TagMenuTrigger.last.closeMenu();
    console.log('search by tag...' + event)
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
}
