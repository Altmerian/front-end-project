import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, RouterEvent, NavigationEnd, NavigationStart } from '@angular/router';
import { combineAll, filter } from 'rxjs/operators';
import { UserService } from './users/user.service';
import { Subscription } from 'rxjs';
import { OrderService } from './orders/order.service';
import jwt_decode from 'jwt-decode';
import { JwtToken } from './shared/models/types';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'front-end-project';
  isHomePage = true;
  subscription: Subscription;

  constructor(
    private router: Router,
    public userService: UserService,
    public orderService: OrderService,
  ) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart && !router.navigated) {
        const token = sessionStorage.getItem('authToken') as string;
        if (token) {
          this.userService.authorizeUser(token.replace('Bearer ', ''));
          const userId = (jwt_decode(token) as JwtToken).userId;
          const order = localStorage.getItem('order|' + userId);
          if (order) {
            const parsedOrder = JSON.parse(order);
            this.orderService.currentOrder = parsedOrder;
            this.orderService.order$.next(parsedOrder);
          }
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

  @HostListener('window:storage', ['$event'])
  syncStorageChanges(event: StorageEvent): void {
    if (event.key.startsWith('order|' + this.userService.currentUser?.id)) {
      const newOrder = JSON.parse(event.newValue);
      this.orderService.currentOrder = newOrder;
      this.orderService.order$.next(newOrder);
    } else if (event.key === 'authToken') {
      if (event.newValue) {
        const newToken = (event.newValue).replace('Bearer ', '');
        this.userService.authorizeUser(newToken);
      } else {
        this.userService.logout();
      }
    }
  }

}
