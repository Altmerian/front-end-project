import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterEvent, NavigationEnd, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserService } from './users/user.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isHomePage: boolean = true;
  subscription: Subscription;

  constructor(
    private router: Router,
    public userService: UserService,
  ) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        let token = sessionStorage.getItem('authToken') as string;
        if (token && !router.navigated) {
          this.userService.authorizeUser(token.replace('Bearer ', ''));
        }
      }
    });
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
    ).subscribe(() => {
      const path = this.router.url;
      this.isHomePage = path.includes('home');
      (document.getElementById('searchPanel') as HTMLInputElement).value = '';
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
