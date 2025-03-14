import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl:string='https://fortin.christba.com/api/login';
  constructor(private http: HttpClient) { }

  register(user: {  userName:string; password: string;  confirmPassword: string; }) {
    // Guardamos los datos en localStorage simulando un registro
    localStorage.setItem('userName', user.userName);
    localStorage.setItem('userPassword', user.password);
    localStorage.setItem('userConfirmPassword', user.confirmPassword);
    
 }

    // Función para hacer login
    login(emailOrNickname: string, password: string): Observable<any> {
      const body = { emailOrNickname, password }; // Cuerpo de la solicitud
      return this.http.post(this.apiUrl, body); // Hacer la solicitud POST
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

