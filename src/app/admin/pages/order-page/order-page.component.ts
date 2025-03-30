import { Component } from '@angular/core';
import { Order } from '../../../shared/models/order/order';
import { OrdersService } from '../../../services/orders/orders.service';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogOrderComponent } from '../../../shared/components/dialog-order/dialog-order.component';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css',
  standalone: false
})
export class OrderPageComponent {
  displayedColumns: string[] = ['id', 'table_number', 'order_date', 'total_amount', 'payment_method_id','status','actions'];
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

    edit(order:Order) {
      // Abre el diálogo con los datos de la orden seleccionada
      const dialogRef = this.dialog.open(DialogOrderComponent, {
        width: '500px',
        data: order, // Pasa la order seleccionada al diálogo
      });
      console.log(order);
    
      // Cuando se cierra el diálogo
      dialogRef.afterClosed().subscribe((result: Order) => {
        if (result) {
          console.log('Order editada:', result);
          this.actualizarOrden(result); // Llama al método para actualizar la order
        }
      });
      }
    
      // Método para actualizar la order
      actualizarOrden(order:Order): void {
        this.orderService.updateOrder(order).subscribe({
          next: (response) => {
            this.showDialog(
              'Orden actualizada con éxito',
              `Se actualizó la orden satisfactoriamente`,
              null
            );
            this.getOrders(); // Actualiza la lista de orders
          },
          error: (error) => {
            this.showDialog(
              'Error al actualizar la orden',
              `Hubo un error al actualizar la orden `,
              null
            );
            console.log(error)
          },
        });
      }

      add(): void {

            const dialogRef = this.dialog.open(DialogOrderComponent, {
              width: '500px',
            });
            dialogRef.afterClosed().subscribe((result: Order) => {
              if (result) {
                const nuevaOrder: Order = {
                  id: "",
                  table_number :  result.table_number,  
                  restaurant_id :   "1",
                  order_date: new Date().toISOString(),
                  total_amount :  result.total_amount,
                  client_id :  result.client_id,
                  pre_tax_total :  result.pre_tax_total,
                  post_tax_total :  result.post_tax_total,
                  payment_method_name :  result.payment_method_name,
                  status_name :  result.status_name,
                  order_type :  result.order_type,
                  discount_id :  result.discount_id,
                };
        
                console.log('Orden a agregar:', nuevaOrder);
                this.agregarOrden(nuevaOrder); 
              }
            });
        }
      
          agregarOrden(order: Order): void {
            console.log(order);
            this.orderService.addOrder(order).subscribe({
              next: (response) => {
                this.showDialog(
                  'Orden agregada con éxito',
                  `Se agregó la orden satisfactoriamente`,
                  null
                );
                this.getOrders();
              },
              error: (error) => {
                this.showDialog(
                  'Error al agregar la orden',
                  `Hubo un error al agregar la orden`,
                  null
                ); console.log(error);
              },
            });
          }
    
     // Método para eliminar un pedido
       delete(order: Order) {
        // Mostrar el diálogo de confirmación
        this.showDialog(
          '¿Estás seguro de borrar este pedido?',
          `Se eliminará el pedido permanentemente.`,
          'Eliminar'
        ).subscribe((result: boolean) => {
          if (result) {
            // Si el usuario confirma, llamar al servicio para eliminar
            this.orderService.deleteOrder(order.id).subscribe({
              next: () => {
                this.showDialog(
                  'Pedido eliminado',
                  'El pedido fue eliminado satisfactoriamente',
                  null
                );
                this.getOrders();
              },
              error: (err) => {
                this.showDialog(
                  'Error al eliminar el pedido',
                  'Hubo un error al eliminar el pedido :(',
                  null
                );
              }
            });
          } else {
            this.showDialog(
              'Accion cancelada ',
              'Operación cancelada satisfactoriamente',
              null
            );
          }
        });
      }

     showDialog(tittle:string,message:string,action:string | null){
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
