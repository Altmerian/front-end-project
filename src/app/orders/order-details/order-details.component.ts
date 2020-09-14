import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Order } from 'src/app/shared/models/order';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/users/user.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order: Order = new Order([]);

  constructor(
    private dialog: MatDialog,
    private location: Location,
    public route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.orderService.getOrder(this.route.snapshot.params.id)
      .subscribe(data => this.order = data);
  }

  goBack(): void {
    this.location.back();
  }

  deleteOrder(): void {
    // TODO
  }
}
