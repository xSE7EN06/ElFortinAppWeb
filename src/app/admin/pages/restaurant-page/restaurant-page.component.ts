import { Component } from '@angular/core';
import { Restaurant } from '../../../shared/models/restaurant/restaurant';
import { RestaurantsService } from '../../../services/restaurants/restaurants.service';

@Component({
  selector: 'app-restaurant-page',
  templateUrl: './restaurant-page.component.html',
  styleUrl: './restaurant-page.component.css'
})
export class RestaurantPageComponent {
displayedColumns: string[] = ['id', 'name', 'location', 'opening_hours','actions'];
    Restaurants:Restaurant[]=[];
  
    constructor(private restaurantService: RestaurantsService){}

    ngOnInit(){
      this.getRestaurants();
    }

    getRestaurants(){      
          this.restaurantService.getRestaurants().subscribe(
            (restaurants: Restaurant[]) => {
              this.Restaurants = restaurants; 
            },
            (error) => {
              console.error('Error al obtener los Restaurantes:', error);
            }
          );
        }

    edit(restaurant: Restaurant) {
  
      }
      
      delete(restaurant: Restaurant) {
        
      }
        
}
