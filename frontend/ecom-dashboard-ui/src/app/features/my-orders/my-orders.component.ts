import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../shared/models/order.models';
import { OrdersService } from '../orders/orders.service';
import { OrderDetailsModalComponent } from '../../shared/components/order-details-modal/order-details-modal.component';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule,OrderDetailsModalComponent],
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders: Order[] = [];
  loading = true;

  selectedOrder: Order | null = null;
  cancelling = false;

  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.ordersService.getMyOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch orders', err);
        this.loading = false;
      }
    });
  }

  openOrder(order: Order) {
    this.selectedOrder = order;
  }

  closeOrder() {
    this.selectedOrder = null;
  }
    cancelOrder(orderId: number) {
    if (!confirm('Are you sure you want to cancel this order?')) return;

    this.cancelling = true;
    this.ordersService.updateOrder(orderId, { status: 'CANCELLED' }).subscribe({
      next: () => {
        this.cancelling = false;
        this.closeOrder();
        this.fetchOrders(); // refresh list
      },
      error: (err) => {
        this.cancelling = false;
        console.error('Failed to cancel order', err);
      }
    });
  }
}
