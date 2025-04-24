import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Cart } from './cart.model';
import { OrderService } from '../orders/order.service';

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
    const order = this.cart[index];
  }
}
