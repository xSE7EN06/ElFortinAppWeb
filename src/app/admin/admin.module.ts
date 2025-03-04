import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MaterialModule } from '../material/material.module';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';


@NgModule({
  declarations: [
    UsersPageComponent,
    LayoutPageComponent,
    ProductsPageComponent,
    OrderPageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ]
})
export class AdminModule { }
