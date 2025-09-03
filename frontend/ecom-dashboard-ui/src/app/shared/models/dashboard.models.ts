export interface DashboardStatsDto {
  totalProducts: number;
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
}

export interface OrderSummaryDto {
  status: string;   // e.g. PENDING, SHIPPED, DELIVERED, CANCELLED
  count: number;
}

export interface SalesTrendDto {
  month: string;   // e.g. "Jan", "Feb", "Mar" or could be ISO date string
  revenue: number;
}

export interface OrderDto {
  id: number;
  customer: {
    id: number;
    email: string;
    name?: string;
  };
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
