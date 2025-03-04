import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css',
  standalone: false
})
export class LayoutPageComponent {
  public sidebarItems = [
    {label: 'Usuarios', icon: 'group', url: './users'},
    {label: 'Productos', icon:'inventory', url: 'products'},
    {label: 'Ordenes', icon: 'receipt', url: 'order'}
  ]
}
