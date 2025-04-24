import { Injectable } from '@angular/core';
import { Cart } from './cart.model';
import { ProductService } from '../products/product.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  cart: Cart[] = [];

  constructor(private productService: ProductService) {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    this.cart = JSON.parse(localStorage.getItem('cart'));
  }

  addItems(index: number, quantity: number) {
    const products = this.productService.fetchProducts();

    const product = products[index];

    const cartItem = {
      ...product,
      quantity: quantity,
    };

    this.cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
