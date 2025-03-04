import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private _formBuilder: FormBuilder, private route: Router) {
    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      address: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  // Opcional: Método para registrar los datos o manejar el final del stepper
  register() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      // Aquí manejarías la lógica para procesar los datos del formulario
      console.log('Registration successful');
      console.log('Name:', this.firstFormGroup.value);
      console.log('Address:', this.secondFormGroup.value);
    } else {
      console.log('Form is not completely valid');
    }
  }

  finish(){
    this.route.navigate(['/admin']);
  }
}

