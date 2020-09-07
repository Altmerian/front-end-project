import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isHomePage: boolean = true;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
    ).subscribe(() => {
      const path = this.router.url;
      this.isHomePage = path.includes('home');
      (document.getElementById('searchPanel') as HTMLInputElement).value = '';
    });
  }
}
