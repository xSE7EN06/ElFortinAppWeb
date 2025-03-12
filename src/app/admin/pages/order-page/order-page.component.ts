import { Component } from '@angular/core';
import { Order } from '../../../shared/models/order/order';
import { OrdersService } from '../../../services/orders/orders.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css',
  standalone: false
})
export class OrderPageComponent {
  displayedColumns: string[] = ['id', 'table_number', 'order_date', 'total_amount', 'payment_method_id', 'actions'];
    Orders:Order[]=[];
  
  constructor(private orderService: OrdersService){}

  ngOnInit(){
    this.getOrders();
  }

  getOrders() {
      this.orderService.getOrders().subscribe(
        (orders: Order[]) => {
          this.Orders = orders; 
        },
        (error) => {
          console.error('Error al obtener los pedidos:', error);
        }
      );
    }

    edit(order: Order) {

    }
    
    delete(order: Order) {
      
    }
}
