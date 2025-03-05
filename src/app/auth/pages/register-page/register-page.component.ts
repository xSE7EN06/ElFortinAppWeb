import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service'; 

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
  standalone: false
})
export class RegisterPageComponent {
  isLinear = false; // Controla si el stepper es lineal o no
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, private route: Router, private authService: AuthService) {
    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  // Opcional: Método para registrar los datos o manejar el final del stepper
  register() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      const userData = this.secondFormGroup.value;

      // Llamamos al servicio para registrar al usuario
      this.authService.register(userData);
      
      console.log('Registro exitoso:', userData);
     

      // Redirigir después del registro
      this.finish();
    } else {
      console.log('Form is not completely valid');
    }
  }

  finish(){
    this.route.navigate(['/auth/login']);
  }
}

