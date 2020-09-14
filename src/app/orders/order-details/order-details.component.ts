import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Order } from 'src/app/shared/models/order';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/users/user.service';
import { OrderService } from '../order.service';
import { AlertComponent } from 'src/app/shared/dialogs/alert/alert.component';
import { ConfirmComponent } from 'src/app/shared/dialogs/confirm/confirm.component';

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

  confirmDelete(): void {
    const deleteConfirm = this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Order delete',
        content: `Do you really want to delete Order with id=${this.order.id}?`,
        buttonLabel: 'Yes'
      }
    });
    deleteConfirm.afterClosed().subscribe(result => {
      if (result === 'ok') {
        this._deleteItem(this.order.id);
      }
    });
  }

  private _deleteItem(id: string): void {
    this.orderService.deleteOrder(id).subscribe(resp => {
      console.log(resp);
      if (resp.ok) {
        this._openDialog(id);
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
    dialogAlert.afterClosed().subscribe(_ => this.goBack());
  }
}
