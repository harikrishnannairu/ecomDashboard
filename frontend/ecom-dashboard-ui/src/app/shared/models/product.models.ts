import { Product } from "../interfaces/product.interface";

export class ProductModel implements Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdBy: string;
  createdAt: string;

  constructor(
    id = 0,
    name = '',
    description = '',
    price = 0,
    stock = 0,
    createdBy = 'system',
    createdAt = new Date().toISOString()
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
  }

  // Optional helper method
  // get formattedPrice(): string {
  //   return `₹${this.price}`;
  // }
}