import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  standalone: false
})
export class LoginPageComponent {
  loginForm: FormGroup;
  isLoading = false;
  constructor(private fb: FormBuilder, private route: Router, private authService: AuthService,private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      emailOrNickname: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(){

}
  
 // Función para manejar el login
 onLogin(): void {
  const { emailOrNickname, password } = this.loginForm.value; // Extrae 'emailOrNickname' y 'password'

  if (this.loginForm.valid) {
    this.authService.login(emailOrNickname, password).subscribe({
      next: (response) => {
        if (response.token) {
          // Si la API devuelve un token, lo almacenamos
          this.authService.storeToken(response.token);
          this.snackBar.open('✅ Login exitoso', 'Cerrar', { duration: 3000 });
          this.route.navigate(['/admin']); // Redirigir al usuario
          
        } else {
          this.snackBar.open('❌ Credenciales invállidas', 'Cerrar', { duration: 3000 });
        }
      },
      error: (error) => {
        this.snackBar.open(`❌ Credenciales inválidas`, 'Cerrar', { duration: 3000 });
      },
    });
  } else {
    this.snackBar.open('⚠️ Completa todos los campos', 'Cerrar', { duration: 3000 });
  }
}

  register(){
    this.route.navigate(['/auth/register']);
  }
}
