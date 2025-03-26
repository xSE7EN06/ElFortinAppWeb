import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrlLogin:string='https://fortin.christba.com/api/login';
  apiUrlRegister:string='https://fortin.christba.com/api/usuarios';
  constructor(private http: HttpClient) { }

   // Función para registrar un nuevo usuario
   register(
    name: string,
    email: string,
    phone: string,
    userType: string,
    nickname: string,
    password: string,
    image: string
  ): Observable<User> { // Usa la interfaz User para tipar la respuesta
    const body = {
      name,
      email,
      phone,
      user_type: userType, // Asegúrate de que coincida con lo que la API espera
      nickname,
      password,
      image,
    };
    return this.http.post<User>(this.apiUrlRegister, body); // Tipar la respuesta como User
  }

    // Función para hacer login
    login(emailOrNickname: string, password: string): Observable<any> {
      const body = { emailOrNickname, password }; // Cuerpo de la solicitud
      return this.http.post(this.apiUrlLogin, body); // Hacer la solicitud POST
    }
  

   // Función para eliminar el token (logout)
   logout(): void {
    localStorage.removeItem('userToken');
    console.log("Token eliminado");
  }


  // Función para almacenar el token en localStorage
  storeToken(token: string): void {
    localStorage.setItem('userToken', token);
  }

   // Función para obtener el token desde localStorage
   getToken(): string | null {
    return localStorage.getItem('userToken');
  }

}

