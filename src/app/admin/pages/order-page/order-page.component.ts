import { Component } from '@angular/core';
import { Order } from '../../../shared/models/order/order';
import { OrdersService } from '../../../services/orders/orders.service';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css',
  standalone: false
})
export class OrderPageComponent {
  displayedColumns: string[] = ['id', 'table_number', 'order_date', 'total_amount', 'payment_method_id', 'actions'];
    Orders:Order[]=[];
  
  constructor(private orderService: OrdersService, 
              private dialog: MatDialog){}

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
    
     // Método para eliminar un pedido
       delete(order: Order) {
        // Mostrar el diálogo de confirmación
        this.mostrarDialog(
          '¿Estás seguro de borrar este pedido?',
          `Se eliminará el pedido permanentemente.`,
          'Eliminar'
        ).subscribe((result: boolean) => {
          if (result) {
            // Si el usuario confirma, llamar al servicio para eliminar
            this.orderService.deleteOrder(order.id).subscribe({
              next: () => {
                this.mostrarDialog(
                  'Pedido eliminado',
                  'El pedido fue eliminado satisfactoriamente',
                  null
                );
                this.getOrders();
              },
              error: (err) => {
                this.mostrarDialog(
                  'Error al eliminar el pedido',
                  'Hubo un error al eliminar el pedido :(',
                  null
                );
              }
            });
          } else {
            this.mostrarDialog(
              'Accion cancelada ',
              'Operación cancelada satisfactoriamente',
              null
            );
          }
        });
      }

     mostrarDialog(tittle:string,message:string,action:string | null){
       const dialogRef = this.dialog.open(DialogComponent, {
          data: {
            title: tittle,
            message: message,
            action: action
          }
        });
    
        return dialogRef.afterClosed();
      }
}
