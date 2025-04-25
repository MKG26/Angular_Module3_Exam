import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = [];

  productChanged = new Subject<Product[]>();

  constructor(private http: HttpClient) {
    if (!localStorage.getItem('products')) {
      localStorage.setItem('products', JSON.stringify(this.products));
    }

    this.products = JSON.parse(localStorage.getItem('products'));
  }

  fetchProducts() {
    return this.products.slice();
  }

  getProducts() {
    return this.http
      .get<Product[]>(
        'https://module3-test-193b9-default-rtdb.firebaseio.com/products.json'
      )
      .subscribe((resData) => {
        this.productChanged.next(resData);
        localStorage.setItem('products', JSON.stringify(resData));
        this.products = resData;
      });
  }

  updateProducts() {
    this.http
      .put(
        'https://module3-test-193b9-default-rtdb.firebaseio.com/products.json',
        this.products
      )
      .subscribe();
  }

  updateProductQuantity(index: number, quantity: number) {
    this.products[index].quantity = quantity;

    this.productChanged.next(this.products);

    localStorage.setItem('products', JSON.stringify(this.products));

    this.updateProducts();
  }
}
