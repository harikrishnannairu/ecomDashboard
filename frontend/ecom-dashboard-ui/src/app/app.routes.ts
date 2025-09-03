import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { LoginComponent } from './auth/login.component';
import { LayoutComponent } from './core/layout/layout/layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path:'login',
        component:LoginComponent
    },
    {
      path:'',
      component:LayoutComponent,
      children:[
        {path:'',component:DashboardComponent},
        {path:'products',loadComponent:()=> import('./features/products/products-list.component').then(c=>c.ProductsListComponent)},
        {path:'orders',loadComponent:()=>import('./features/orders/orders-list.component').then(c=>c.OrdersListComponent)},
        {path:'my-orders',loadComponent:()=>import('./features/my-orders/my-orders.component').then(c=>c.MyOrdersComponent)}
        // {path:'chatgpt',loadComponent:()=>import('./features/chatgpt/chatgpt.component').then(c=>c.ChatgptComponent)}

      ]
    }

];
/*
    {
        path:'dashboard',
        canActivate:[authGuard],
        loadComponent:()=> import().then(c=>c.DashboardComponent)
    }
  {
    path: 'products',
    canActivate: [authGuard],
    loadComponent: () => import('./products/products-list.component').then(m => m.ProductsListComponent)
  },
  {
    path: 'products/manage',
    canActivate: [roleGuard],
    data: { roles: ['ADMIN'] },
    loadComponent: () => import('./products/product-manage.component').then(m => m.ProductManageComponent)
  },
  {
    path: 'orders',
    canActivate: [roleGuard],
    data: { roles: ['ADMIN'] },
    loadComponent: () => import('./orders/orders-admin.component').then(m => m.OrdersAdminComponent)
  },
  {
    path: 'orders/me',
    canActivate: [authGuard],
    loadComponent: () => import('./orders/orders-me.component').then(m => m.OrdersMeComponent)
  },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: '**', loadComponent: () => import('./shared/pages/not-found.component').then(m => m.NotFoundComponent) }
*/
