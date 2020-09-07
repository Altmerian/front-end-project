import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { OrderComponent } from './order/order.component';



@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    SharedModule,
  ]
})
export class OrderModule { }
