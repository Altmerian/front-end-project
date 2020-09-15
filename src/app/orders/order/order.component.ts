import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { Certificate } from 'src/app/shared/models/certificate';
import { OrderService } from '../order.service';
import { UserService } from 'src/app/users/user.service';
import { ConfirmComponent } from 'src/app/shared/dialogs/confirm/confirm.component';
import { Order } from 'src/app/shared/models/order';
import { AlertComponent } from 'src/app/shared/dialogs/alert/alert.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  certificates: Certificate[] = [];
  subscription: Subscription;
  total: number;

  constructor(
    private dialog: MatDialog,
    private location: Location,
    private router: Router,
    private orderService: OrderService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.orderService.order$.subscribe(order => {
      this.certificates = order?.filter(certificate => !certificate.deleted);
      this.total = order.reduce((sum, item) => sum + item.price, 0);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  goBack(): void {
    this.location.back();
  }

  removeItem(index: number): void {
    this.orderService.removeCertificate(index);
  }

  comfirmOrder(): void {
    if (!this.userService.currentUser) {
      this._loginRequiredAlert();
      return;
    }
    const editConfirm = this.dialog.open(ConfirmComponent, {
      data: {
        title: 'New Order',
        content: `Please, confirm to create a new order.`,
        buttonLabel: 'Confirm order'
      }
    });
    editConfirm.afterClosed().subscribe(result => {
      if (result === 'ok') {
        this._createOrder();
      }
    });
  }

  clearOrder(): void {
    this.orderService.currentOrder = [];
    this.orderService.syncOrder([]);
  }

  private _loginRequiredAlert(): void {
    const orderAlert = this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Authorization required',
        content: `Only authorized users can perform an order, please log in`,
        buttonLabel: 'To the login page',
      }
    });
    orderAlert.afterClosed().subscribe(result => {
      if (result === 'ok') {
        this.router.navigateByUrl('user/login');
      }
    });
  }

  private _createOrder(): void {
    this.orderService.createOrder(new Order(this.certificates)).subscribe(
      resp => {
        console.log(resp);
        if (resp.status === 201) {
          const orderId = resp.headers.get('Location').replace(/^.*[\\\/]/, '');
          this._openDialog(orderId);
        }
      }, error => {
        console.log(error);
      }
    );
  }

  private _openDialog(id: string): void {
    const orderAlert = this.dialog.open(AlertComponent, {
      data: {
        title: 'New Order',
        content: `Order has been created with id=${id}. To check out press the link below: `,
        buttonLabel: 'Got it!',
        link: `user/${this.userService.currentUser.id}/orders/${id}`
      }
    });
    orderAlert.afterClosed().subscribe(_ => {
      this.router.navigateByUrl('');
      this.orderService.currentOrder = ([]);
      this.orderService.syncOrder([]);
    });
  }

}
