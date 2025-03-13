import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MaterialModule } from '../material/material.module';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { RestaurantPageComponent } from './pages/restaurant-page/restaurant-page.component';
import { SalePageComponent } from './pages/sale-page/sale-page.component';
import { ProviderPageComponent } from './pages/provider-page/provider-page.component';
import { PromotionPageComponent } from './pages/promotion-page/promotion-page.component';


@NgModule({
  declarations: [
    UsersPageComponent,
    LayoutPageComponent,
    ProductsPageComponent,
    OrderPageComponent,
    RestaurantPageComponent,
    SalePageComponent,
    ProviderPageComponent,
    PromotionPageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ]
})
export class AdminModule { }
