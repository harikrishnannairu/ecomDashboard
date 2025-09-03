export class OrderItem {
  id!: number;
  productName!: string;
  quantity!: number;
  totalPrice!: number;
}

export class Order {
  id!: number;
  user!: { id: number; email: string };
  status?: string;
  totalAmount?: number;
  createdBy!:string;
  createdAt!: string;
  updatedAt?: string;
  items?: OrderItem[];
}

export class PagedResponse<T> {
  orders!: T[];
  totalPages!: number;
  totalElements?: number;
  size?: number;
  number?: number;
}