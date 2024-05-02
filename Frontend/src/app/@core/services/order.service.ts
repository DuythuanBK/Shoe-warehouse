import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order, MultipleOrder } from '../data/order';
import { OrderParam, getParamsStr } from '../data/param';
import { Observable } from 'rxjs';
import { ConfigService } from './configService';
import { BACKEND_URL } from '../data/common';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = `${BACKEND_URL}/orders`

  constructor(private configService: ConfigService, private http: HttpClient) {
  }


  getOrders(params: OrderParam): Observable<MultipleOrder> {
    return this.http.get<MultipleOrder>(`${this.url}?${getParamsStr(params)}`);
  }

  addOrder(expense: Order): Observable<Order> {
    return this.http.post<Order>(this.url, expense);
  }

  updateOrder(expense: Order): Observable<void> {
    return this.http.put<void>(this.url, expense);
  }

  deleteOrder(expense: Order): Observable<void> {
    return this.http.delete<void>(this.url, {"body": expense});
  }

}
