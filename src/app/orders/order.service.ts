import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient) {}

  orders: Order[] = [];

  getOrders() {
    return this.http
      .get<Order[]>(
        'https://module3-test-193b9-default-rtdb.firebaseio.com/orders.json'
      )
      .pipe(
        tap((resData) => {
          this.orders = resData;
        })
      )
      .subscribe();
  }

  private placeOrder() {
    this.http
      .put(
        'https://module3-test-193b9-default-rtdb.firebaseio.com/orders.json',
        this.orders
      )
      .subscribe();
  }

  orderToPlace(order: Order) {
    this.orders.push(order);
    this.placeOrder();
  }
}
