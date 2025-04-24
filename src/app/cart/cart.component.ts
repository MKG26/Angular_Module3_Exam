import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Cart } from './cart.model';
import { OrderService } from '../orders/order.service';
import { Order } from '../orders/order.model';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cart: Cart[] = [];

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.cart = this.cartService.cart;
  }

  onPlaceOrder(index: number) {
    const cartItem = this.cart[index];

    const user = JSON.parse(localStorage.getItem('userData'));

    const order: Order = {
      ...cartItem,
      user: user.email,
      date: new Date(),
      status: 'Placed',
    };

    this.orderService.orderToPlace(order);

    this.cart.splice(index, 1);

    localStorage.setItem('cart', JSON.stringify(this.cart));

    this.cartService.cart = this.cart;
  }
}
