import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  standalone: false
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private route: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit(): void {
    
  }

  ngOnInit(){
}
  
  login() {
    const { userName, password } = this.loginForm.value; // Obtén las credenciales
  
    if (this.loginForm.valid) {
      // Asegúrate de que el orden de los parámetros sea password, userName
      if (this.authService.login(password, userName)) {
        console.log('Login exitoso');
        this.route.navigate(['/admin']);
      } else {
        console.log('Credenciales incorrectas');
      }
    } else {
      this.loginForm.markAllAsTouched(); // Marca todos los campos como tocados para mostrar los errores
    }
  }
  
  

  register(){
    this.route.navigate(['/auth/register']);
  }
}
