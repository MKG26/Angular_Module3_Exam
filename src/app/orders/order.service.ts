import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { Subject, tap } from 'rxjs';
import { ProductService } from '../products/product.service';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {
    this.getOrders();
  }

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
    this.updateOrders();
  }

  updateOrders() {
    this.http
      .put(
        'https://module3-test-193b9-default-rtdb.firebaseio.com/orders.json',
        this.orders
      )
      .subscribe(() => {
        console.log('Orders updated on server');
        this.orderChanged.next([...this.orders]);
      });
  }

  orderToPlace(order: Order, quantity: number) {
    console.log('Adding new order:', order);
    this.orders.push(order);
    order.quantity = quantity;
    this.orderChanged.next([...this.orders]);

    const products = this.productService.fetchProducts();
    const productIndex = products.findIndex(
      (product) => product.name === order.name
    );

    if (productIndex !== -1) {
      const currentQuantity = products[productIndex].quantity;

      const newQuantity = Math.max(0, currentQuantity - quantity);

      this.productService.updateProductQuantity(productIndex, newQuantity);
    }

    this.placeOrder();
  }
}
