import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Restaurant } from '../../shared/models/restaurant/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  private apiUrl="https://fortin.christba.com/api/restaurantes";

  constructor(private http: HttpClient) { }

  getRestaurants():Observable<Restaurant[]>{
 return this.http.get<{ status: string; message: string; data: Restaurant[] }>(this.apiUrl)
      .pipe(
        map(response => response.data)  // Extrae solo el array 'data' de la respuesta
      );
  }

  getRestaurantById(id:number):Observable<Restaurant>{
    return this.http.get<{ data: Restaurant }>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)  // Extrae solo el array 'data' de la respuesta
    );
  }

}
