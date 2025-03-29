import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MaterialModule } from '../material/material.module';
import { DialogUserComponent } from './components/dialog-user/dialog-user.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    Error404PageComponent,
    DialogComponent,
    DialogUserComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],

  exports: [
    Error404PageComponent,
    DialogComponent,
    DialogUserComponent
  ]
})
export class SharedModule { }
