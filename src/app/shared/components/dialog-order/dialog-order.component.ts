import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from '../../models/order/order';

const notFutureDateValidator = (control: AbstractControl): ValidationErrors | null => {
  const selectedDate = new Date(control.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Eliminamos la hora para comparar solo fechas
  
  return selectedDate > today ? { futureDate: true } : null;
};

@Component({
  selector: 'app-dialog-order',
  templateUrl: './dialog-order.component.html',
  styleUrl: './dialog-order.component.css'
})
export class DialogOrderComponent {
  orderForm: FormGroup;
  isEditMode: boolean = false;


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogOrderComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)public data: any
  ){
    this.isEditMode = !!data?.id;

     this.orderForm = this.fb.group({
      id: [''],
      table_number: ['', Validators.required],
      restaurant_id: ["1"],
      order_date: [ new Date().toISOString().split('T')[0], [Validators.required, notFutureDateValidator]],
      total_amount: ['', Validators.required],
      client_id: [null],
      pre_tax_total: ['', Validators.required],
      post_tax_total: ['', Validators.required],
      payment_method_name: ['', Validators.required],  
      status_name: ['', Validators.required],       
      order_type: ['online'],
      discount_id: ['']
    });
    if (this.isEditMode) {
      // Mapeo correcto de los campos
      this.orderForm.patchValue({
        ...this.data,
        restaurant_id: this.data.restaurant_id,  // Ya es string, coinciden
        payment_method_name: this.data.payment_method, // Mapear payment_method a payment_method_name
        status_name: this.data.status,          // Mapear status a status_name
        });
    }
  }

  ngOnInit(): void {
    if (!this.isEditMode) {
      this.orderForm.get('id')?.disable();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (this.orderForm.invalid) {
      this.showFormErrors();
      return;
    }
  
    const formData = this.prepareFormData();
    this.dialogRef.close(formData);
  }

  private prepareFormData(): any {
    const formValue = this.orderForm.value;
    
    return {
      id: formValue.id || "",
      table_number: Number(formValue.table_number),
      restaurant_id: "1", // Valor fijo como string
      order_date: new Date().toISOString(),
      total_amount: formValue.total_amount,
      client_id: null,
      pre_tax_total: formValue.pre_tax_total,
      post_tax_total: formValue.post_tax_total,
      payment_method_: formValue.payment_method_id, // Para uso interno
      status_id: formValue.status_id,                 // Para uso interno
      payment_method_name: formValue.payment_method_name, // Para la API
      status_name: formValue.status_name,                 // Para la API
      order_type: formValue.order_type,
      discount_id: null
    };
  }

private showFormErrors(): void {
  const errors = [];
  
  // Validaciones para cada campo en el formulario
  if (this.orderForm.get('table_number')?.hasError('required')) {
    errors.push('El número de mesa es requerido');
  }

  if (this.orderForm.get('restaurant_id')?.hasError('required')) {
    errors.push('El restaurante es requerido');
  }

  if (this.orderForm.get('order_date')?.hasError('required')) {
    errors.push('La fecha de la orden es requerida');
  }

  if (this.orderForm.get('total_amount')?.hasError('required')) {
    errors.push('El monto total es requerido');
  }

  if (this.orderForm.get('client_id')?.hasError('required')) {
    errors.push('El cliente es requerido');
  }

  if (this.orderForm.get('pre_tax_total')?.hasError('required')) {
    errors.push('El total antes de impuestos es requerido');
  }

  if (this.orderForm.get('post_tax_total')?.hasError('required')) {
    errors.push('El total después de impuestos es requerido');
  }

  if (this.orderForm.get('payment_method_name')?.hasError('required')) {
    errors.push('El método de pago es requerido');
  }

  if (this.orderForm.get('status_name')?.hasError('required')) {
    errors.push('El estado de la orden es requerido');
  }

  if (this.orderForm.get('order_type')?.hasError('required')) {
    errors.push('El tipo de orden es requerido');
  }

  if (this.orderForm.get('discount_id')?.hasError('required')) {
    errors.push('El descuento es requerido');
  }

  // Si hay errores, mostrar mensaje
  if (errors.length > 0) {
    this.snackBar.open(errors.join(', '), 'Cerrar', { duration: 5000 });
  }
}

}