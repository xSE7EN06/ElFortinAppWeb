import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Promotion } from '../../shared/models/promotion/promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {
  
  private apiUrl="https://fortin.christba.com/api/promociones";

  constructor(private http: HttpClient) { }

  //Metodo para obtener todas las promociones
  getPromotions():Observable<Promotion[]>{
     return this.http.get<{ status: string; message: string; data: Promotion[] }>(this.apiUrl)
          .pipe(
            map(response => response.data)  // Extrae solo el array 'data' de la respuesta
          );
  }

  //Metodo para obtener promocion por id
  getPromotionById(id:number):Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`);
  }

   deletePromotion(id: string):Observable<any>{
      return this.http.delete(`${this.apiUrl}/${id}`);
    } 
  
    addPromotion(promotion: Promotion):Observable<Promotion>{
      return this.http.post<Promotion>(`${this.apiUrl}`, promotion);
    }
  
    updatePromotion(promotion:Promotion):Observable<Promotion>{
    if(!promotion.id) throw Error('Promotion ID is required');
    return this.http.put<Promotion>(`${this.apiUrl}/${promotion.id}`, promotion);
    }

}
