import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  register(user: {  userName:string; password: string;  confirmPassword: string; }) {
    // Guardamos los datos en localStorage simulando un registro
    localStorage.setItem('userName', user.userName);
    localStorage.setItem('userPassword', user.password);
    localStorage.setItem('userConfirmPassword', user.confirmPassword);
    
    // Verificar si se guardaron correctamente
  console.log("Verificar name:", localStorage.getItem('name'));
  console.log("Verificar userName:", localStorage.getItem('userName'));
  }

  login(password: string, userName: string): boolean {
    const storedUserName = localStorage.getItem('userName');
    const storedPassword = localStorage.getItem('userPassword');   

    if (userName === storedUserName && password === storedPassword ) {
      const token = this.generateToken(userName);  // Generar el token
      this.storeToken(token);  // Almacenar el token en localStorage
         console.log(localStorage.getItem('userToken'));   
      return true; // Inicio de sesión exitoso
    }
    return false; // Credenciales incorrectas
  }

  logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('userPassword');
    localStorage.removeItem('userConfirmPassword');
    localStorage.removeItem('userToken');
    
  }

  generateToken(userName: string): string {
    return btoa(userName + ':' + new Date().getTime()); // Genera un token básico con el nombre y el timestamp
  }

  storeToken(token: string) {
    localStorage.setItem('userToken', token);
  }

}

