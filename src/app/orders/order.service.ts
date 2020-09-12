import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { Order } from '../shared/models/order';
import { UserService } from '../users/user.service';
import { Certificate } from '../shared/models/certificate';
import { filter, throwIfEmpty } from 'rxjs/operators';
import { NotFoundError } from '../shared/errors/notFoundError';
import { MessageService } from '../shared/services/message.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  order$ = new BehaviorSubject<Certificate[]>(this._getLastOrder());
  currentOrder: Certificate[] = [];
  readonly apiUrl = 'http://localhost:8087/gift-rest-service/api/v1';

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
    localStorage.order = JSON.stringify(changedOrder);
  }

  removeCertificate(index: number): void {
    this.currentOrder.splice(index, 1);
    this.syncOrder(this.currentOrder);
  }

  createOrder(order: Order): Observable<HttpResponse<any>> {
    const url = `${this.apiUrl}/users/${this.userService.currentUser.id}/orders`;
    return this.http.post<any>(url, order, { observe: 'response' });
  }

  getOrder(id: string): Observable<Order> {
    const url = `${this.apiUrl}/users/${this.userService.currentUser.id}/orders/${id}`;
    return this.http.get<Order>(url).pipe(
      filter(order => !order.deleted),
      throwIfEmpty(() => new NotFoundError(`Order with id=${id} not found`)));
  }

  _getLastOrder(): Certificate[] {
    return JSON.parse(localStorage.getItem('order'));
  }

}
