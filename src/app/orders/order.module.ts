import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OrderComponent } from './order/order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderListComponent } from './order-list/order-list.component';



@NgModule({
  declarations: [
    OrderComponent,
    OrderDetailsComponent,
    OrderListComponent,
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
  ]
})
export class OrderModule { }
