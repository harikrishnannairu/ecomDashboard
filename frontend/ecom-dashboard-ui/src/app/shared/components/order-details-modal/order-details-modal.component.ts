import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from '../../models/order.models';
import { OrdersService } from '../../../features/orders/orders.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-details-modal',
  imports: [CommonModule,FormsModule],
  templateUrl: './order-details-modal.component.html',
  styleUrl: './order-details-modal.component.css'
})
export class OrderDetailsModalComponent {
  @Input() order!: Order;
  @Input() viewMyOrders:boolean=false;
  @Input() cancelling:boolean=false;
  @Output() closed = new EventEmitter<void>();
  @Output() updated = new EventEmitter<Order>();
  @Output() cancelOrder = new EventEmitter<number>();

  constructor(private ordersService: OrdersService) {}

  updateStatus() {
    if (!this.order) return;
    this.ordersService.updateOrder(this.order.id, { status: this.order.status }).subscribe({
      next: (updatedOrder) => {
        this.updated.emit(updatedOrder);
        this.close();
      },
      error: (err) => console.error('Failed to update order', err)
    });
  }

  close() {
    this.closed.emit();
  }
}
