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

  filteredOrder: Order[] = [];

  ngOnInit(): void {
    this.orderService.getOrders();

    this.orderService.orderChanged.subscribe((orders) => {
      this.order = orders;

      this.filterOrderByCurrentUser();
    });

    this.order = this.orderService.orders;

    this.filterOrderByCurrentUser();
  }

  filterOrderByCurrentUser() {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData && userData.email) {
      this.filteredOrder = this.order.filter((order) => {
        return order.user === userData.email;
      });

      console.log('Filtered orders:', this.filteredOrder);
    } else {
      this.filteredOrder = [];
    }
  }
}
