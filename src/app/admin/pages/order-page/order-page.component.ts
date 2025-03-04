import { Component } from '@angular/core';

export interface OrderData {
  id: string;
  productId: string;
  quantity: number;
  date: Date;
}

const ORDER_DATA: OrderData[] = [
  { id: '1', productId: '101', quantity: 2, date: new Date('2022-10-05') },
  { id: '2', productId: '102', quantity: 1, date: new Date('2022-10-06') },
  { id: '3', productId: '103', quantity: 4, date: new Date('2022-10-07') },
  { id: '4', productId: '104', quantity: 1, date: new Date('2022-10-08') },
  { id: '5', productId: '105', quantity: 3, date: new Date('2022-10-09') },
  { id: '6', productId: '106', quantity: 5, date: new Date('2022-10-10') },
  { id: '7', productId: '107', quantity: 2, date: new Date('2022-10-11') },
  { id: '8', productId: '108', quantity: 2, date: new Date('2022-10-12') },
  { id: '9', productId: '109', quantity: 3, date: new Date('2022-10-13') },
  { id: '10', productId: '110', quantity: 1, date: new Date('2022-10-14') }
];

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css',
  standalone: false
})
export class OrderPageComponent {
  displayedColumns: string[] = ['id', 'productId', 'quantity', 'date'];
    dataSource = ORDER_DATA;
  
    edit(order: OrderData) {
        // Aquí va la lógica para editar un usuario
        console.log('Edit order:', order);
        // Por ejemplo, abrir un modal de edición o redirigir a un formulario de edición
      }
    
      delete(order: OrderData) {
        // Aquí va la lógica para eliminar un usuario
        console.log('Delete order:', order);
        // Implementa la eliminación de usuarios aquí
      }
}
