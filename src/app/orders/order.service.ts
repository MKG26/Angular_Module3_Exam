import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { Subject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient) {}

  orders: Order[] = [];

  orderChanged = new Subject<Order[]>();

  getOrders() {
    return this.http
      .get<Order[]>(
        'https://module3-test-193b9-default-rtdb.firebaseio.com/orders.json'
      )
      .pipe(
        tap((resData) => {
          console.log('Orders received from API:', resData);
          this.orders = resData || [];
          this.orderChanged.next([...this.orders]);
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
      .subscribe(() => {
        console.log('Orders updated on server');
      });
  }

  orderToPlace(order: Order) {
    console.log('Adding new order:', order);
    this.orders.push(order);
    this.orderChanged.next([...this.orders]);
    this.placeOrder();
  }
}
