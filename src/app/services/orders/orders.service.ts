import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../../shared/models/order/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = 'https://fortin.christba.com/api/orders';
  
  constructor(private http: HttpClient) { }

  //Metodo para obtener todos los pedidos
  getOrders(): Observable<Order[]> {
    return this.http.get<{ status: string; message: string; data: Order[] }>(this.apiUrl)
      .pipe(
        map(response => response.data)  // Extrae solo el array 'data' de la respuesta
      );
  }

  //Metodo para obtener un pedido mediante el id
  getOrderById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteOrder(id:string):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  addOrder(Order: Order):Observable<any>{
    return this.http.post<Order>(`${this.apiUrl}`,Order)
  }

  updateOrder(order:Order):Observable<Order>{
    if (!order.id) throw Error('Order ID is required');
    return this.http.put<Order>(`${this.apiUrl}/${order.id}`, order);
  }

}
