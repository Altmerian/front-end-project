import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Order } from "../shared/models/order";
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  currentOrder: Order;
  readonly apiUrl = 'http://localhost:8087/gift-rest-service/api/v1';

  constructor(
    private http: HttpClient,
    private userService: UserService,
    ) { }

    //201 with location header
  addOrder(order: Order): Observable<HttpResponse<any>> {
    const url = this.apiUrl + `/${this.userService.currentUser.id}/orders`
    return this.http.post<any>(url, order, { observe: 'response' });
  }
}
