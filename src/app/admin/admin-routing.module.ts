import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { RestaurantPageComponent } from './pages/restaurant-page/restaurant-page.component';
import { ProviderPageComponent } from './pages/provider-page/provider-page.component';
import { PromotionPageComponent } from './pages/promotion-page/promotion-page.component';
import { SalePageComponent } from './pages/sale-page/sale-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,

    children: [
      {path: 'users', component: UsersPageComponent},
      {path: 'products', component: ProductsPageComponent},
      {path: 'order', component: OrderPageComponent},
      {path: 'restaurants', component: RestaurantPageComponent},
      {path: 'providers', component: ProviderPageComponent},
      {path: 'promotions', component: PromotionPageComponent},
      {path: 'sales', component: SalePageComponent},
      {path: '**', redirectTo: 'users'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
