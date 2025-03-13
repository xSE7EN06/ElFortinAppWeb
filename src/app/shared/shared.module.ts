import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MaterialModule } from '../material/material.module';
@NgModule({
  declarations: [
    Error404PageComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],

  exports: [
    Error404PageComponent,
    DialogComponent
  ]
})
export class SharedModule { }
