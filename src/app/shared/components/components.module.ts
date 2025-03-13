import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { DialogFormComponent } from './dialog-form/dialog-form.component';


@NgModule({
  declarations: [MatDialogModule,
    DialogComponent,
    DialogFormComponent
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
