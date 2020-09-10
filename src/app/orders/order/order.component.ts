import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

import { Certificate } from 'src/app/shared/models/certificate';
import { OrderService } from '../order.service';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  certificates: Certificate[] = [];

  constructor(
    private location: Location,
    private orderService: OrderService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    const lastOrder: Certificate[] = JSON.parse(sessionStorage.getItem(this.userService.currentUser.id + '/order'));
    if (lastOrder) {
      this.certificates = lastOrder;
    }
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    if (this.certificates.length) {
      const lastOrder = JSON.stringify(this.certificates);
      sessionStorage.setItem(this.userService.currentUser.id + '/order', lastOrder);
    }
  }
}
