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

  ngOnInit(): void {
    this.products = this.productService.products;
  }
}
