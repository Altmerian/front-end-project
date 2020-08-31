import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showClass: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleShowClass() {
    this.showClass = !this.showClass;
  }
}
