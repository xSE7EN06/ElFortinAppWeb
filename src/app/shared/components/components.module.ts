import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { SpinnerComponent } from './spinner/spinner.component';


@NgModule({
  declarations: [ SpinnerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
   ]
})
export class ComponentsModule { }
