import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogProductComponent } from '../dialog-product/dialog-product.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-promotion',
  templateUrl: './dialog-promotion.component.html',
  styleUrl: './dialog-promotion.component.css'
})
export class DialogPromotionComponent {
  promotionForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<DialogProductComponent>,
      private snackBar: MatSnackBar,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.isEditMode = !!data?.id;
          
          this.promotionForm = this.fb.group({
            id: [''],
            code: ['', [Validators.required]],
            description: ['', Validators.required],
            discount_type: ['', Validators.required],
            value: [0 , Validators.required],
            start_date: ['', Validators.required],
            end_date: ['',Validators.required],
            active: [ ,Validators.required],
          });
      
          if (this.isEditMode) {
            this.promotionForm.patchValue(data);
          }
    }

    ngOnInit(): void {
      if (!this.isEditMode) {
        this.promotionForm.get('id')?.disable();
      }
    }

      onNoClick():void{
      this.dialogRef.close();
      }

      onConfirm(): void {
        if (this.promotionForm.invalid) {
          this.showFormErrors();
          return;
        }
    
        const formData = this.prepareFormData();
        this.dialogRef.close(formData);
      }

      private prepareFormData(): any {
        const formValue = this.promotionForm.value;                        
        return formValue;
      }

      private showFormErrors(): void {
        const errors = [];
        
        if (this.promotionForm.get('code')?.hasError('required')) {
          errors.push('El codigo es requerido');
        }
        
        if (this.promotionForm.get('description')?.hasError('required')) {
          errors.push('La descripción es requerida');
        }
        if (this.promotionForm.get('discount_type')?.hasError('required')) {
          errors.push('El tipo de descuento es requerido');
        }
        if (this.promotionForm.get('value')?.hasError('required')) {
          errors.push('El descuento es requerida');
        }
        if (this.promotionForm.get('start_date')?.hasError('required')) {
          errors.push('La fecha es requerida');
        }
        if (this.promotionForm.get('end_date')?.hasError('required')) {
          errors.push('La fecha es requerida');
        }
        if (this.promotionForm.get('active')?.hasError('required')) {
          errors.push('Ingresa si esta activo o no');
        }

        if (errors.length > 0) {
          this.snackBar.open(errors.join(', '), 'Cerrar', { duration: 5000 });
        }
      }

}
