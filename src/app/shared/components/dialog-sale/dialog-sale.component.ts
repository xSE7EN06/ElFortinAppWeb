import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

const notFutureDateValidator = (control: AbstractControl): ValidationErrors | null => {
  const selectedDate = new Date(control.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Eliminamos la hora para comparar solo fechas
  
  return selectedDate > today ? { futureDate: true } : null;
};

@Component({
  selector: 'app-dialog-sale',
  templateUrl: './dialog-sale.component.html',
  styleUrl: './dialog-sale.component.css'
})
export class DialogSaleComponent {
    saleForm: FormGroup;
    isEditMode: boolean = false;

    constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<DialogSaleComponent>,
      private snackBar : MatSnackBar,
      @Inject(MAT_DIALOG_DATA)public data: any
     ){
      this.isEditMode = !!data?.id;
            
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
     }

     onNoClick():void{
      this.dialogRef.close();
      }

      onConfirm(): void {
        if (this.saleForm.invalid) {
          console.log("INVALIDO")
          this.showFormErrors();
          return;
        }
        console.log("INVALIDO")
        console.log(this.saleForm)
        const formData = this.prepareFormData();
        this.dialogRef.close(formData);
      }


      private prepareFormData(): any {
        const formValue = this.saleForm.value;                        
        return formValue;
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
