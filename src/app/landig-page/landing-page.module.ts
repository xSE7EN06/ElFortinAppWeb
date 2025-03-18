import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandigPageComponent } from './landig-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LandigPageComponent
  }
];

@NgModule({
  declarations: [LandigPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ]
})
export class LandingPageModule { }
