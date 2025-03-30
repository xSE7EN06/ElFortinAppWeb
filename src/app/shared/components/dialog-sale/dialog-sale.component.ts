import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Restaurant } from '../../models/restaurant/restaurant';
import { RestaurantsService } from '../../../services/restaurants/restaurants.service';


const notFutureDateValidator = (control: AbstractControl): ValidationErrors | null => {
  const selectedDate = new Date(control.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate > today ? { futureDate: true } : null;
};

@Component({
  selector: 'app-dialog-sale',
  templateUrl: './dialog-sale.component.html',
  styleUrls: ['./dialog-sale.component.css'],
  standalone:false
})
export class DialogSaleComponent implements OnInit {
  saleForm: FormGroup;
  isEditMode: boolean = false;
  restaurants: Restaurant[] = []; // Lista de restaurantes
  isLoadingRestaurants = true; // Estado de carga

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogSaleComponent>,
    private snackBar: MatSnackBar,
    private restaurantService: RestaurantsService, // Inyecta el servicio
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.saleForm = this.fb.group({
      id: [''],
      restaurant_id: ['', Validators.required], // Agregué Validators.required como ejemplo
      report_date: [
        new Date().toISOString().split('T')[0], 
        [Validators.required, notFutureDateValidator] // Corrección aquí
      ],
      total_sales: ['', Validators.required], // Agregué Validators.required como ejemplo
    });
          if (this.isEditMode) {
            this.saleForm.patchValue(data);
          }
    this.isEditMode = !!data?.id;
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadRestaurants();
  }

  private initializeForm(): void {
    this.saleForm = this.fb.group({
      id: [''],
      restaurant_id: ['', Validators.required],
      report_date: [
        new Date().toISOString().split('T')[0], 
        [Validators.required, notFutureDateValidator]
      ],
      total_sales: ['', Validators.required]
    });

    if (this.isEditMode) {
      this.saleForm.patchValue(this.data);
    }
  }

  private loadRestaurants(): void {
    this.isLoadingRestaurants = true;
    this.restaurantService.getRestaurants().subscribe({
      next: (restaurants) => {
        this.restaurants = restaurants;
        this.isLoadingRestaurants = false;
      },
      error: (err) => {
        console.error('Error al cargar restaurantes:', err);
        this.snackBar.open('Error al cargar restaurantes', 'Cerrar', { duration: 3000 });
        this.isLoadingRestaurants = false;
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (this.saleForm.invalid) {
      this.showFormErrors();
      return;
    }
    this.dialogRef.close(this.saleForm.value);
  }

  private showFormErrors(): void {
    const errors = [];
    
    if (this.saleForm.get('restaurant_id')?.hasError('required')) {
      errors.push('El restaurante es requerido');
    }
    
    if (this.saleForm.get('report_date')?.hasError('required')) {
      errors.push('La fecha es requerida');
    }

    if (this.saleForm.get('total_sales')?.hasError('required')) {
      errors.push('El total es requerido');
    }

    if (errors.length > 0) {
      this.snackBar.open(errors.join(', '), 'Cerrar', { duration: 5000 });
    }
  }
}