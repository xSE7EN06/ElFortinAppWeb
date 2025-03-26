import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../shared/interfaces/usuario';

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

  addUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}`, usuario);
  }

  updateUsuario(user: Usuario): Observable<Usuario> {
    if (!user.id) throw Error('User ID is required');
    return this.http.put<Usuario>(`${this.apiUrl}/${user.id}`, user);

    console.log(user);
  }

}
