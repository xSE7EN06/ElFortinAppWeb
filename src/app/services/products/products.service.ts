import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://fortin.christba.com/api/products'
  
  constructor(private http: HttpClient) { }

  //Metodo para obtener todos los productos
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl); 
  }

  // Método para obtener un producto por ID
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);  
  }

  deleteProduct(id: string):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  } 

  addProduct(product: Product):Observable<Product>{
    return this.http.post<Product>(`${this.apiUrl}`, product);
  }

  updateProduct(product:Product):Observable<Product>{
  if(!product.id) throw Error('User ID is required');
  return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }
}
