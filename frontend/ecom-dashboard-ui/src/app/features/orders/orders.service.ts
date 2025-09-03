import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, PagedResponse } from '../../shared/models/order.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private apiUrl=`${environment.apiUrl}/orders`
  constructor(private http:HttpClient) { }

    getOrders(page: number, size: number): Observable<PagedResponse<Order>> {
    return this.http.get<PagedResponse<Order>>(
      `${this.apiUrl}?page=${page}&size=${size}`
    );
  }
  /**
   * ✅ Create a new order
   * Backend: POST /orders
   */
  createOrder(order: Partial<Order>): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  /**
   * ✅ Get logged-in user orders
   * Backend: GET /orders/me
   */
  getMyOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/me`);
  }
    /**
   * ✅ Get a specific order by ID
   * Backend: GET /orders/{orderId}
   */
  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
  }

    /**
   * ✅ Update an order (status or full object depending on backend logic)
   * Backend: PUT /orders/{orderId}
   */
  updateOrder(orderId: number, update: Partial<Order>): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${orderId}`, update);
  }
  
    /**
   * (Optional) Delete an order — if backend supports it
   * Backend: DELETE /orders/{orderId}
   */
  deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${orderId}`);
  }
  
}
