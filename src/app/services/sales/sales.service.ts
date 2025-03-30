import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Sale } from '../../shared/models/sale/sale';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private apiUrl="https://fortin.christba.com/api/ventas";

  constructor(private http: HttpClient) { }

  //Metodo para obtener todas las ventas
  getSales():Observable<Sale[]>{
    return this.http.get<{ status: string; message: string; data: Sale[] }>(this.apiUrl)
        .pipe(
        map(response => response.data)  // Extrae solo el array 'data' de la respuesta
      );
  }

  //Metodo para obtener una venta por id
  getSaleById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addSale(sale: Sale):Observable<Sale>{
    return this.http.post<Sale>(`${this.apiUrl}`, sale);
  }

  updateSale(sale: Sale): Observable<Sale>{
     if(!sale.id) throw Error('Sale ID is required');
      return this.http.put<Sale>(`${this.apiUrl}/${sale.id}`, sale);
  }

  deleteSale(id: string):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
