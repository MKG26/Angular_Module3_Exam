import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  products: Product[] = [
    new Product(
      '1',
      'Cup',
      'CORPORATE PORIUM Personalised Stainless Steel Coffee l Vacuum Coffee Mug with Silicon Grip ',
      4,
      20,
      500,
      'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQPV5OAK_-hj3vz2j3ZsN52mxpUkLpDfyQwL8ckIkKe_BT_wvCfG88LLm7CwAvCeTwWLVX5p6p1eUz6f-vWQMY3WVMZstZshD_J-h3bTnQj0K0IBPDDJNH8Zg'
    ),
    new Product(
      '2',
      'Basket',
      'Kuber Industries Multipurpose Solitaire Storage Basket with Lid ',
      5,
      10,
      1000,
      'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcROVO6QleXXhcHnaovGGZxppj5HmdYL-bPe_TqtRF0OC0EnramXlNpn8fAvZIdFrzzKMfVzzDR1HqngfuRIyaoRsKpG8P7WXgapvL1_lqdomGja3kzZeX0gvw'
    ),
  ];

  updateProducts() {
    this.http.put(
      'https://module3-test-193b9-default-rtdb.firebaseio.com/',
      this.products
    );
  }
}
