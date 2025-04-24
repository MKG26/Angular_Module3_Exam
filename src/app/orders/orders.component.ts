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

  isAdmin = false;

  openDropdownIndex: number = -1;

  ngOnInit(): void {
    this.orderService.getOrders();

    this.orderService.orderChanged.subscribe((orders) => {
      this.order = orders;

      this.filterOrderByCurrentUser();
    });

    this.order = this.orderService.orders;

    this.filterOrderByCurrentUser();

    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData.email === 'admin@gmail.com') {
      this.isAdmin = true;
    }
  }

  filterOrderByCurrentUser() {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData && userData.email) {
      this.filteredOrder = this.order.filter((order) => {
        return (
          order.user === userData.email || userData.email === 'admin@gmail.com'
        );
      });

      console.log('Filtered orders:', this.filteredOrder);
    } else {
      this.filteredOrder = [];
    }
  }

  toggleDropdown(index: number) {
    if (this.openDropdownIndex === index) {
      this.openDropdownIndex = -1;
    } else {
      this.openDropdownIndex = index;
    }
  }

  updateOrderStatus(
    index: number,
    status: 'Placed' | 'Processing' | 'On the way' | 'Delivered'
  ) {
    this.filteredOrder[index].status = status;

    const originalOrderIndex = this.order.findIndex(
      (order) =>
        order.user === this.filteredOrder[index].user &&
        order.date === this.filteredOrder[index].date
    );

    if (originalOrderIndex !== -1) {
      this.order[originalOrderIndex].status = status;

      this.orderService.orders = [...this.order];
      this.orderService.updateOrders();
    }

    this.openDropdownIndex = -1;
  }
}
