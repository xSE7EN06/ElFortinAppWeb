import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { DialogUserComponent } from './components/dialog-user/dialog-user.component';
import { DialogProductComponent } from './components/dialog-product/dialog-product.component';
import { DialogOrderComponent } from './components/dialog-order/dialog-order.component';
import {DialogProviderComponent} from './components/dialog-provider/dialog-provider.component'
import { DialogPromotionComponent } from './components/dialog-promotion/dialog-promotion.component';
import { DialogSaleComponent } from './components/dialog-sale/dialog-sale.component';


@NgModule({
  declarations: [
    Error404PageComponent,
    DialogComponent,
    DialogUserComponent,
    DialogProductComponent,
    DialogOrderComponent,
    DialogProviderComponent,
    DialogPromotionComponent,
    DialogSaleComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],

  exports: [
    Error404PageComponent,
    DialogComponent,
    DialogUserComponent,
    DialogProductComponent,
    DialogOrderComponent,
    DialogProviderComponent,
    DialogPromotionComponent,
  ]
})
export class SharedModule { }
