import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { Order } from './order.model';

@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  constructor(private orderService: OrderService) {}

  order: Order[] = [];

  ngOnInit(): void {
    this.orderService.getOrders();

    this.order = this.orderService.orders;

    const user = JSON.parse(localStorage.get('userData'));

    this.order.filter((order) => {
      user.email === order.user;
    });
  }
}
