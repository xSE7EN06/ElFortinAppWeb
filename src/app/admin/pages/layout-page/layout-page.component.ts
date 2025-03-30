import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service'; 
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
    {label: 'Ordenes', icon: 'receipt', url: 'order'},
    {label: 'Ventas', icon: 'paid', url: 'sales'},
    {label: 'Proveedores', icon: 'groups', url: 'providers'},
    {label: 'Promociones', icon: 'savings', url: 'promotions'}
    
  ]



  constructor(private router: Router,private authService: AuthService){}

  exit(){
    this.router.navigate(['/auth']);
    this.authService.logout(); 
  }

  

}
