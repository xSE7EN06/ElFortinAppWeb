import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { DialogUserComponent } from './components/dialog-user/dialog-user.component';
@NgModule({
  declarations: [
    Error404PageComponent,
    DialogComponent,
    DialogUserComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],

  exports: [
    Error404PageComponent,
    DialogComponent,
    DialogUserComponent
    
  ]
})
export class SharedModule { }
