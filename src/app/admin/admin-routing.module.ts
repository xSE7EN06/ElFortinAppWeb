import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,

    children: [
      {path: 'users', component: UsersPageComponent},
      {path: 'products', component: ProductsPageComponent},
      {path: 'order', component: OrderPageComponent},
      {path: '**', redirectTo: 'users'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
