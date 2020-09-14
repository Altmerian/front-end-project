import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Order } from '../shared/models/order';
import { UserService } from '../users/user.service';
import { Certificate } from '../shared/models/certificate';
import { filter, map, tap, throwIfEmpty } from 'rxjs/operators';
import { NotFoundError } from '../shared/errors/notFoundError';
import { MessageService } from '../shared/services/message.service';
import { OrdersData } from '../shared/models/types';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  order$ = new BehaviorSubject<Certificate[]>(this._getLastOrder());
  currentOrder: Certificate[] = [];
  readonly apiUrl = 'http://localhost:8088/gift-rest-service/api/v1';

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    private userService: UserService,
  ) { }

  addCertificate(certificate: Certificate): void {
    this.currentOrder.push(certificate);
    this.syncOrder(this.currentOrder);
    this.messageService.autoHideMessage('Add to cart', `Item with id =${certificate.id} was added to the shopping cart`);
  }

  syncOrder(changedOrder: Certificate[]): void {
    this.order$.next(changedOrder);
    localStorage.setItem('order|' + this.userService.currentUser?.id, JSON.stringify(changedOrder));
  }

  removeCertificate(index: number): void {
    this.currentOrder.splice(index, 1);
    this.syncOrder(this.currentOrder);
  }

  removeDeletedItem(id: string): void {
    const updatedOrder = this.currentOrder.filter(cert => cert.id !== id);
    this.currentOrder = updatedOrder;
    this.syncOrder(updatedOrder);
    this.syncAllCurrentOrders(id);
  }

  syncAllCurrentOrders(id: string): void {
    for (const key in Object.keys(localStorage)) {
      if (key.startsWith('order|')) {
        const order = JSON.parse(localStorage.getItem(key)) as Certificate[];
        const updatedOrder = order.filter(cert => cert.id !== id);
        localStorage.setItem(key, JSON.stringify(updatedOrder));
      }
    }
  }


  createOrder(order: Order): Observable<HttpResponse<any>> {
    const url = `${this.apiUrl}/users/${this.userService.currentUser?.id}/orders`;
    return this.http.post<any>(url, order, { observe: 'response' });
  }

  getUserOrders(): Observable<Order[]> {
    const url = `${this.apiUrl}/users/${this.userService.currentUser?.id}/orders`;
    return this.http.get<OrdersData>(url).pipe(
      map(data => data.orders.filter(order => !order.deleted)));
  }

  getOrder(id: string): Observable<Order> {
    const url = `${this.apiUrl}/users/${this.userService.currentUser?.id}/orders/${id}`;
    return this.http.get<Order>(url).pipe(
      filter(order => !order.deleted),
      throwIfEmpty(() => new NotFoundError(`Order with id=${id} not found`)));
  }

  deleteOrder(id: string): Observable<HttpResponse<any>> {
    const url = `${this.apiUrl}/users/${this.userService.currentUser?.id}/orders/${id}`;
    return this.http.delete<any>(url, { observe: 'response' }).pipe(
      tap(_ => console.log(`deleted order id=${id}`)),
    );
  }

  _getLastOrder(): Certificate[] {
    let order: Certificate[] = [];
    const userId = this.userService.currentUser;
    if (userId) {
      order = JSON.parse(localStorage.getItem('order|' + userId));
    }
    return order;
  }

}
