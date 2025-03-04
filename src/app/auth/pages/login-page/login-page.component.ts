import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  standalone: false
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private route: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Login success:', this.loginForm.value);
      // Aquí iría la lógica para manejar el inicio de sesión exitoso
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  login(){
    this.route.navigate(['/admin']);
  }

  register(){
    this.route.navigate(['/auth/register']);
  }
}
