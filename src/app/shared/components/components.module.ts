import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { DialogProductComponent } from './dialog-product/dialog-product.component';

@NgModule({
  declarations: [MatDialogModule,
    DialogComponent,
    DialogProductComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports:[
    DialogComponent
  ]
})
export class ComponentsModule { }
