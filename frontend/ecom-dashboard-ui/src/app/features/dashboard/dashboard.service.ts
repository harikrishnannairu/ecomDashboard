import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {  DashboardStatsDto, OrderSummaryDto, SalesTrendDto } from '../../shared/models/dashboard.models';
import { Order, PagedResponse } from '../../shared/models/order.models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = `${environment.apiUrl}/dashboard`;
  private ordersUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  getStats(): Observable<DashboardStatsDto> {
    return this.http.get<DashboardStatsDto>(`${this.baseUrl}/stats`);
  }

  getOrdersSummary(): Observable<OrderSummaryDto[]> {
    return this.http.get<OrderSummaryDto[]>(`${this.baseUrl}/orders-summary`);
  }

  getSalesTrend(): Observable<SalesTrendDto[]> {
    return this.http.get<SalesTrendDto[]>(`${this.baseUrl}/sales-trend`);
  }

  getRecentOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(
      `${this.baseUrl}/recent-orders`
    );
  }
  // `${this.ordersUrl}?page=0&size=5&sort=createdAt,desc`
}
