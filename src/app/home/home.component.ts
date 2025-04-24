import { Component, OnInit } from '@angular/core';
import { Product } from '../products/product.model';
import { AuthService } from '../auth/auth.service';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private productService: ProductService
  ) {}

  products: Product[] = [];

  productQuantity: number[] = [];

  ngOnInit(): void {
    if (!localStorage.getItem('products')) {
      this.productService.getProducts();
    }

    this.productService.productChanged.subscribe((products) => {
      this.products = products;
    });

    this.products = this.productService.fetchProducts();
  }

  initializeQuantities() {
    this.productQuantity = new Array(this.products.length).fill(0);
  }

  increaseQuantity(index: number) {}

  onAddToCart(index: number, quantity: number) {}
}
