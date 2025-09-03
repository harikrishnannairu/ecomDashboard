import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../../shared/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  private apiBaseUrl=`${environment.apiUrl}/products`

  getAll():Observable<Product[]>{
    return this.http.get<Product[]>(this.apiBaseUrl);
  }

  create(product:Product):Observable<Product>{
    return this.http.post<Product>(this.apiBaseUrl,product);
  }

  update(id:number,product:Product):Observable<Product>{
    const url=`${this.apiBaseUrl}/${id}`
    return this.http.put<Product>(url,product);
  }

  delete(id:number):Observable<String>{
    const url=`${this.apiBaseUrl}/${id}`
    return this.http.delete<String>(url);
  }
}
