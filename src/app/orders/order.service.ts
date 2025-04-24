import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient) {}

  orders: Order[] = [];

  placeOrder() {
    this.http.put(
      'https://module3-test-193b9-default-rtdb.firebaseio.com/orders.json',
      this.orders
    );
  }

  orderToPlace(order: Order) {
    this.orders.push(order);
    this.placeOrder();
  }
}
