import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  productQuantity: number[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.fetchProducts();

    this.productService.productChanged.subscribe((productsData) => {
      this.products = productsData;
      this.initializeProductQuantity();
    });
    this.initializeProductQuantity();
  }

  initializeProductQuantity() {
    this.productQuantity = this.products.map((product) => product.quantity);
  }

  increaseProductQuantity(index: number) {
    this.productQuantity[index]++;
  }

  decreaseProductQuantity(index: number) {
    if (this.productQuantity[index] > 0) {
      this.productQuantity[index]--;
    }
  }

  submitProductQuantity(index: number) {
    this.productService.updateProductQuantity(
      index,
      this.productQuantity[index]
    );
  }
}
