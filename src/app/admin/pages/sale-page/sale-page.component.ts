import { Component } from '@angular/core';
import { Sale } from '../../../shared/models/sale/sale'; 
import { SalesService } from '../../../services/sales/sales.service';
import { RestaurantsService } from '../../../services/restaurants/restaurants.service';
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
    private restaurantService: RestaurantsService // Inyecta tu servicio de restaurantes
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

   edit(sale: Sale) {
  
      }
      
      delete(sale: Sale) {
        
      }

}
