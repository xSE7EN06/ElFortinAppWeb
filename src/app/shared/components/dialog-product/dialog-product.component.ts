import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.scss']
})
export class DialogProductComponent implements OnInit {
  productForm: FormGroup;
  isEditMode: boolean = false;
  categories: string[] = ['Bebidas', 'Restaurante', 'Panaderia'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogProductComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data?.id;
    
    this.productForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(255)],
      price: ['', [Validators.required, Validators.min(0)]],
      category_name: ['', Validators.required],
      pre_tax_cost: ['', [Validators.min(0)]],
      post_tax_cost: ['', [Validators.min(0)]]
    });

    if (this.isEditMode) {
      this.productForm.patchValue(data);
    }
  }

  ngOnInit(): void {
    if (!this.isEditMode) {
      this.productForm.get('id')?.disable();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (this.productForm.invalid) {
      this.showFormErrors();
      return;
    }

    const formData = this.prepareFormData();
    this.dialogRef.close(formData);
  }

  private prepareFormData(): any {
    const formValue = this.productForm.value;
    
    // Convertir números
    formValue.price = parseFloat(formValue.price);
    formValue.pre_tax_cost = formValue.pre_tax_cost ? parseFloat(formValue.pre_tax_cost) : null;
    formValue.post_tax_cost = formValue.post_tax_cost ? parseFloat(formValue.post_tax_cost) : null;

    return formValue;
  }

  private showFormErrors(): void {
    const errors = [];
    
    if (this.productForm.get('name')?.hasError('required')) {
      errors.push('El nombre es requerido');
    }
    
    if (this.productForm.get('price')?.hasError('required')) {
      errors.push('El precio es requerido');
    }
    
    if (this.productForm.get('category_name')?.hasError('required')) {
      errors.push('La categoría es requerida');
    }

    if (errors.length > 0) {
      this.snackBar.open(errors.join(', '), 'Cerrar', { duration: 5000 });
    }
  }
}