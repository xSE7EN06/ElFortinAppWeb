import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'https://fortin.christba.com/api/usuarios';

  constructor(private http: HttpClient) {}

  //Metodo para obtener todos los usuarios
  getUsuarios(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  //Metodo para obtener un usuario mediante el id
  getUsuarioById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteUsuario(id: number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  } 

}
