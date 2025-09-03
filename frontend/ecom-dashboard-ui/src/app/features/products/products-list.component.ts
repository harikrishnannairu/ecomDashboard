// import { Component } from '@angular/core';
// import { ProductsService } from './products.service';
// import { ProductModel } from '../../shared/models/product.models';
// import { Product } from '../../shared/interfaces/product.interface';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-products-list',
//   imports: [CommonModule,FormsModule],
//   templateUrl: './products-list.component.html',
//   styleUrl: './products-list.component.css'
// })
// export class ProductsListComponent {

//   products: ProductModel[] = [];
//   filtered: ProductModel[] = [];
//   searchTerm = '';
//   page = 1;
//   pageSize = 5;


//   constructor(private productService:ProductsService){}

//   ngOnInit():void{
//     this.productService.getAll()
//     .subscribe(res=>{
//       this.products=res;
//       this.filtered=[...this.products];
//     })
//   }

//   search(){
//     this.filtered=this.products.filter(p=>
//       p.name.toLowerCase().includes(this.searchTerm.toLocaleLowerCase())
//     );
//     this.page=1;
//   }

//   get paginated():ProductModel[]{
//     const start=(this.page - 1) * this.pageSize;
//     return this.filtered.slice(start,start+this.pageSize);
//   }

//   totalPages():number{
//     return Math.ceil(this.filtered.length)/this.pageSize;
//   }
// }
import { Component } from '@angular/core';
import { ProductsService } from './products.service';
import { ProductModel } from '../../shared/models/product.models';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {

  products: ProductModel[] = [];
  filtered: ProductModel[] = [];
  searchTerm = '';
  page = 1;
  pageSize = 5;
    showModal = false;
  productForm!: FormGroup;
  isEdit = false;
  editingProductId: number | null = null;

  constructor(
    private productService: ProductsService,
    private toastr: ToastrService,
     private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.initForm();
  }
// Form creation
  initForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(1)]],
      stock: [0, [Validators.required, Validators.min(0)]],
    });
  }

  loadProducts() {
    this.productService.getAll().subscribe({
      next: res => {
        this.products = res;
        this.filtered = [...this.products];
      },
      error: () => this.toastr.error("Failed to load products")
    });
  }

  search() {
    this.filtered = this.products.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.page = 1;
  }

  get paginated(): ProductModel[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  totalPages(): number {
    return Math.ceil(this.filtered.length / this.pageSize);
  }

  openCreateDialog() {
    this.isEdit = false;
    this.editingProductId = null;
    this.showModal = true;
    this.productForm.reset({
      name: '',
      description: '',
      price: 0,
      stock: 0
    });
  }


  openEditDialog(product: ProductModel) {
    this.isEdit = true;
    this.editingProductId = product.id;
    this.showModal = true;
    this.productForm.patchValue(product);
  }

   closeModal() {
    this.showModal = false;
  }

    saveProduct() {
    if (this.productForm.invalid) {
      this.toastr.warning("Please fill required fields");
      const firstInvalid=document.querySelector('form .ng-invalid') as HTMLElement;
      if(firstInvalid){
        firstInvalid.focus();
      }
      return;
    }

    const productData = this.productForm.value;

    if (this.isEdit && this.editingProductId) {
      // Update product
      this.productService.update(this.editingProductId, productData).subscribe({
        next: () => {
          this.toastr.success("Product updated successfully");
          this.closeModal();
          this.loadProducts();
        },
        error: () => this.toastr.error("Failed to update product")
      });
    } else {
      // Create product
      this.productService.create(productData).subscribe({
        next: () => {
          this.toastr.success("Product created successfully");
          this.closeModal();
          this.loadProducts();
        },
        error: () => this.toastr.error("Failed to create product")
      });
    }
  }

  deleteProduct(id: number) {
    if (confirm("Are you sure you want to delete this product?")) {
      this.productService.delete(id).subscribe({
        next: () => {
          this.toastr.success("Product deleted");
          this.loadProducts();
        },
        error: (err) => this.toastr.error(err.error)
      });
    }
  }

  isInvalid(controlName: string): boolean {
  const control = this.productForm.get(controlName);
  return !!(control && control.invalid && (control.dirty || control.touched));
}
}
