import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Order } from 'src/app/shared/models/order';
import { UserService } from 'src/app/users/user.service';
import { OrderService } from '../order.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/shared/dialogs/confirm/confirm.component';
import { AlertComponent } from 'src/app/shared/dialogs/alert/alert.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    private dialog: MatDialog,
    private location: Location,
    private orderService: OrderService,
    public userService: UserService,
  ) { }

  ngOnInit(): void {
    this._getUserOrders();
  }

  private _getUserOrders(): void {
    this.orderService.getUserOrders().subscribe(data => {
      this.orders = data;
    });
  }

  goBack(): void {
    this.location.back();
  }

  confirmDelete(id: string): void {
    const deleteConfirm = this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Order delete',
        content: `Do you really want to delete Order with id=${id}?`,
        buttonLabel: 'Yes'
      }
    });
    deleteConfirm.afterClosed().subscribe(result => {
      if (result === 'ok') {
        this._deleteItem(id);
      }
    });
  }

  private _deleteItem(id: string): void {
    this.orderService.deleteOrder(id).subscribe(resp => {
      console.log(resp);
      if (resp.ok) {
        this._openDialog(id);
        this._getUserOrders();
      }
    }, error => {
      console.log(error);
    });
  }

  private _openDialog(id: string): void {
    const dialogAlert = this.dialog.open(AlertComponent, {
      data: {
        title: 'Deleted',
        content: `Order with id=${id} was deleted`,
        buttonLabel: 'Ok'
      }
    });
  }
}
