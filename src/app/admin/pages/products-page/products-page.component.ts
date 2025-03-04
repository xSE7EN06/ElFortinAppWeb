import { Component } from '@angular/core';

// interfaces.ts
export interface ProductData {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const PRODUCT_DATA: ProductData[] = [
  { id: '1', name: 'Laptop Pro', price: 1200.00, quantity: 35 },
  { id: '2', name: 'Headphones', price: 150.00, quantity: 75 },
  { id: '3', name: 'Smartphone X', price: 999.99, quantity: 45 },
  { id: '4', name: 'Gaming Monitor', price: 300.00, quantity: 25 },
  { id: '5', name: 'Bluetooth Speaker', price: 200.00, quantity: 60 },
  { id: '6', name: 'External Hard Drive', price: 100.00, quantity: 80 },
  { id: '7', name: 'Smart Watch', price: 350.00, quantity: 90 },
  { id: '8', name: 'Camera Kit', price: 750.00, quantity: 30 },
  { id: '9', name: 'Tablet B', price: 450.00, quantity: 40 },
  { id: '10', name: 'Desktop Computer', price: 1500.00, quantity: 20 }
];


@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
  standalone: false
})
export class ProductsPageComponent {
  displayedColumns: string[] = ['id', 'name', 'price', 'quantity', 'actions'];
  dataSource = PRODUCT_DATA;

  edit(product: ProductData) {
      // Aquí va la lógica para editar un usuario
      console.log('Edit product:', product);
      // Por ejemplo, abrir un modal de edición o redirigir a un formulario de edición
    }
  
    delete(product: ProductData) {
      // Aquí va la lógica para eliminar un usuario
      console.log('Delete product:', product);
      // Implementa la eliminación de usuarios aquí
    }
}
