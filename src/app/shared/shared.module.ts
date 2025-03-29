import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MaterialModule } from '../material/material.module';
import { DialogUserComponent } from './components/dialog-user/dialog-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogProductComponent } from './components/dialog-product/dialog-product.component';

@NgModule({
  declarations: [
    Error404PageComponent,
    DialogComponent,
    DialogUserComponent,
    DialogProductComponent,
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
    DialogProductComponent
  ]
})
export class SharedModule { }
