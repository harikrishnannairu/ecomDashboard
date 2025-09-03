import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { OrdersService } from './orders.service';
import { Order, PagedResponse } from '../../shared/models/order.models';
import { ToastrService } from 'ngx-toastr';
import { OrderDetailsModalComponent } from '../../shared/components/order-details-modal/order-details-modal.component';

@Component({
  selector: 'app-orders-list',
  standalone:true,
  imports: [CommonModule,FormsModule,OrderDetailsModalComponent],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent implements OnInit {

  orders: Order[] = [];
  searchTerm = '';
  page = 0;            // backend pages are usually 0-based
  pageSize = 5;
  totalPages :number = 0;
  totalElements :number | undefined = 0;
  loading = false;
  selectedOrder: Order | null = null;


  constructor(private orderService:OrdersService,
     private toastr: ToastrService,
     private fb: FormBuilder
  ){}
    ngOnInit(): void {
    this.loadOrders();
  }
  loadOrders(){
    this.loading=true;
    this.orderService.getOrders(this.page,this.pageSize).subscribe({
      next:(res:PagedResponse<Order>) =>{
        this.orders=res?.orders;
        this.totalPages=res?.totalPages;
        this.totalElements=res?.totalElements;
        this.loading=false;
      },
      error:(err)=>{
        this.toastr.error("Failed to load orders");
        this.loading=false;
      }
  });
  }

  search():void{
    if(this.searchTerm.trim()){
      this.orders=this.orders.filter(o=>
        o.id.toString().includes(this.searchTerm) || o.user.email.toLowerCase().includes(this.searchTerm)
      )
    }else{
      this.loadOrders();
    }
  }
  changePage(newPage:number){
    if(newPage >=0 && newPage < this.totalPages){
        this.page=newPage;
        this.loadOrders();
    }
  }
  openOrder(order: Order) {
  this.selectedOrder = { ...order }; // copy to avoid direct mutation
}

onOrderUpdated(updated:any) {
  // replace in list
  const index = this.orders.findIndex(o => o.id === updated.id);
  if (index > -1) this.orders[index] = updated;
  this.selectedOrder = null;
}
}
