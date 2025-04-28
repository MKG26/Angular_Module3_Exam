import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../products/product.model';
import { AuthService } from '../auth/auth.service';
import { ProductService } from '../products/product.service';
import { CartService } from '../cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  private productSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  products: Product[] = [];

  productQuantity: number[] = [];

  ngOnInit(): void {
    this.products = this.productService.fetchProducts();
    this.productSubscription = this.productService.productChanged.subscribe(
      (products) => {
        console.log('products', products);
        this.products = products;

        this.initializeQuantities();
      }
    );

    this.initializeQuantities();
  }

  initializeQuantities() {
    this.productQuantity = new Array(this.products.length).fill(0);
  }

  increaseQuantity(index: number) {
    this.productQuantity[index]++;
  }

  decreaseQuantity(index: number) {
    this.productQuantity[index]--;
  }

  onAddToCart(index: number) {
    this.cartService.addItems(index, this.productQuantity[index]);
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }
}
