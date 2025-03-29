import { Component } from '@angular/core';
import { Sale } from '../../../shared/models/sale/sale'; 
import { SalesService } from '../../../services/sales/sales.service';
import { RestaurantsService } from '../../../services/restaurants/restaurants.service';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogSaleComponent } from '../../../shared/components/dialog-sale/dialog-sale.component';
@Component({
  selector: 'app-sale-page',
  templateUrl: './sale-page.component.html',
  styleUrl: './sale-page.component.css'
})
export class SalePageComponent {
  displayedColumns: string[] = ['id', 'restaurant', 'report_date', 'total_sales', 'actions'];
  sales: Sale[] = [];

  constructor(
    private saleService: SalesService,
    private restaurantService: RestaurantsService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.getSales();
  }

  getSales() {
    this.saleService.getSales().subscribe(
      (sales: Sale[]) => {
        this.sales = sales;

        // Para cada venta, obtenemos el nombre del restaurante
        this.sales.forEach((sale) => {
          this.restaurantService.getRestaurantById(sale.restaurant_id).subscribe(
            (restaurantData) => {
              // Asignamos el nombre del restaurante a la venta
              sale.restaurant_name = restaurantData.name;            
            },
            (error) => {
              console.error('Error al obtener el restaurante:', error);
            }
          );
        });
      },
      (error) => {
        console.error('Error al obtener las ventas:', error);
      }
    );
  }

      
      delete(sale:Sale) {
            
            // Mostrar el diálogo de confirmación
            this.showDialog(
              '¿Estás seguro de borrar esta venta?',
              `Se eliminará permanentemente.`,
              'Eliminar'
            ).subscribe((result: boolean) => {
              if (result) {
                // Si el usuario confirma, llamar al servicio para eliminar
                this.saleService.deleteSale(sale.id).subscribe({
                  next: () => {
                    this.showDialog(
                      'Venta Eliminada',
                      'La venta fue eliminado satisfactoriamente',
                      null
                    );
                    this.getSales();
                  },
                  error: (err) => {
                    this.showDialog(
                      'Error al borrar la venta',
                      'Hubo un error al eliminar la venta :(',
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

          edit(sale:Sale) {
            // Abre el diálogo con los datos del proveedor seleccionado
            const dialogRef = this.dialog.open(DialogSaleComponent, {
              width: '500px',
              data: sale, // Pasa el producto seleccionado al diálogo
            });
          
            // Cuando se cierra el diálogo
            dialogRef.afterClosed().subscribe((result: Sale) => {
              if (result) {
                console.log('Venta editado:', result);
                this.actualizarVenta(result); // Llama al método para actualizar el proveedor
              }
            });
            }
          
            // Método para actualizar el proveedor
            actualizarVenta(sale: Sale): void {
              this.saleService.updateSale(sale).subscribe({
                next: (response) => {
                  this.showDialog(
                    'Venta actualizada con éxito',
                    `Se actualizó satisfactoriamente`,
                    null
                  );
                  this.getSales(); // Actualiza la lista 
                },
                error: (error) => {
                  this.showDialog(
                    'Error al actualizar la venta',
                    `Hubo un error al actualizar  `,
                    null
                  );
                  console.log(error)
                },
              });
            }

            
               add(): void {
                    const dialogRef = this.dialog.open(DialogSaleComponent, {
                      width: '500px',
                    });
                
                    dialogRef.afterClosed().subscribe((result: Sale) => {
                      if (result) {
                        const nuevaVenta: Sale = {
                          id: "",
                          restaurant_id: result.restaurant_id,
                          report_date: result.report_date,
                          total_sales: result.total_sales,
                          
                        };
                
                        console.log('Venta a agregar:', nuevaVenta);
                        this.agregarVenta(nuevaVenta); 
                      }
                    });
                }
              
                  agregarVenta(sale: Sale): void {
                    this.saleService.addSale(sale).subscribe({
                      next: (response) => {
                        this.showDialog(
                          'Venta agregada con éxito',
                          `Se agregó la venta satisfactoriamente`,
                          null
                        );
                        this.getSales();
                      },
                      error: (error) => {
                        this.showDialog(
                          'Error al agregar la venta',
                          `Hubo un error al agregar la venta`,
                          null
                        ); console.log(error);
                      },
                    });
                  }
            

       private showDialog(title: string, message: string, action: string | null) {
            const dialogRef = this.dialog.open(DialogComponent, {
              data: {
                title: title,
                message: message,
                action: action
              }
            });
            return dialogRef.afterClosed();
          }
}
