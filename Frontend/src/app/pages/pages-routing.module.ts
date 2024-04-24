import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'products', loadChildren: () => import('./products/products.module').then((m) => m.ProductsModule) },
      { path: 'stock', loadChildren: () => import('./stock/stock.module').then((m) => m.StockModule) },
      { path: 'expenses', loadChildren: () => import('./expenses/expenses.module').then((m) => m.ExpensesModule) },
      { path: 'orders', loadChildren: () => import('./orders/orders.module').then((m) => m.OrdersModule) },
      { path: 'import', loadChildren: () => import('./import/import.module').then(m => m.ImportModule) },
      { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
