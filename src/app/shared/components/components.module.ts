import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';


@NgModule({
  declarations: [MatDialogModule,
    DialogComponent
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
