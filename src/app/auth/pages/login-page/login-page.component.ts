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
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit(): void {
    
  }

  ngOnInit(){
    localStorage.setItem('userPassword', 'angel');
    localStorage.setItem('userPassword', '123456789');
    
}
  
login() {
  const { userName, password } = this.loginForm.value;

  if (this.loginForm.valid) {
    this.isLoading = true; // Activar loader

    setTimeout(() => {  // Simula un tiempo de espera (reemplázalo con la petición real)
      if (this.authService.login(password, userName)) {
        this.snackBar.open('✅ Login exitoso', 'Cerrar', { duration: 3000 });
        this.route.navigate(['/admin']);
      } else {
        this.snackBar.open('❌ Credenciales incorrectas', 'Cerrar', { duration: 3000 });
      }

      this.isLoading = false; // Ocultar loader después del proceso
    }, 2000);
    
  } else {
    this.snackBar.open('⚠️ Completa todos los campos', 'Cerrar', { duration: 3000 });
    this.loginForm.markAllAsTouched();
  }
}
  
  

  register(){
    this.route.navigate(['/auth/register']);
  }
}
