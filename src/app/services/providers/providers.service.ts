import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Provider } from '../../shared/models/provider/provider';
@Injectable({
  providedIn: 'root'
})
export class ProvidersService {
  private apiUrl = "https://fortin.christba.com/api/proveedores";
  
  constructor(private http: HttpClient) { }

  //Metodo para obtener todos los proveedores
  getProviders():Observable<Provider[]>{
  return this.http.get<{ status: string; message: string; data: Provider[] }>(this.apiUrl)
      .pipe(
        map(response => response.data)  // Extrae solo el array 'data' de la respuesta
      );
  }

  //Metodo para obtener un proveedor por id
  getProviderById(id:number):Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addProvider(provider: Provider):Observable<Provider>{
    return this.http.post<Provider>(`${this.apiUrl}`, provider);
  }

  updateProvider(provider: Provider): Observable<Provider>{
     if(!provider.id) throw Error('Provider ID is required');
      return this.http.put<Provider>(`${this.apiUrl}/${provider.id}`, provider);
  }

  deleteProvider(id: string):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
