import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../shared/models/user/user';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
  standalone: false
})
export class RegisterPageComponent {
  isLinear = true; // Stepper lineal (no se puede saltar pasos)
  firstFormGroup: FormGroup; // Formulario para datos personales
  secondFormGroup: FormGroup; // Formulario para datos de usuario

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    // Inicializar el primer formulario (datos personales)
    this.firstFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      maternalLastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
    });

    // Inicializar el segundo formulario (datos de usuario)
    this.secondFormGroup = this.fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator }); // Validador personalizado
  }

  // Validador personalizado para confirmar contraseña
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

// Función para registrar al usuario
register(): void {
  if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
    const personalData = this.firstFormGroup.value;
    const userData = this.secondFormGroup.value;

    const name = `${personalData.firstName} ${personalData.lastName} ${personalData.maternalLastName}`;
    const email = personalData.email;
    const phone = personalData.phone;
    const userType = 'client'; // Valor por defecto
    const nickname = userData.userName;
    const password = userData.password;
    const image = 'default-image-url'; // Puedes cambiarlo según tu lógica

    this.authService
      .register(name, email, phone, userType, nickname, password, image)
      .subscribe({
        next: (response) => {
          this.snackBar.open('✅ Registro exitoso', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/auth/login']); // Redirigir al usuario al login
        },
        error: (error) => {
          console.error('Error en el registro:', error);
          this.snackBar.open(`❌ Error en el registro`, 'Cerrar', { duration: 3000 });
        },
      });
  } else {
    this.snackBar.open('⚠️ Completa todos los campos correctamente', 'Cerrar', { duration: 3000 });
  }
}
}