import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, RouterEvent, NavigationEnd, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserService } from './users/user.service';
import { Subscription } from 'rxjs';
import { OrderService } from './orders/order.service';


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
        const token = localStorage.getItem('authToken') as string;
        if (token) {
          this.userService.authorizeUser(token.replace('Bearer ', ''));
        }
        const order = localStorage.getItem('order') as string;
        if (order) {
          this.orderService.currentOrder = JSON.parse(order);
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
    switch (event.key) {
      case 'order': {
        const newOrder = JSON.parse(event.newValue);
        this.orderService.currentOrder = newOrder;
        this.orderService.order$.next(newOrder);
        break;
      }
      case 'authToken': {
        if (event.newValue) {
          const newToken = (event.newValue).replace('Bearer ', '');
          this.userService.authorizeUser(newToken);
        } else {
          this.userService.logout();
        }
        break;
      }
      default:
        break;
    }

  }

}
