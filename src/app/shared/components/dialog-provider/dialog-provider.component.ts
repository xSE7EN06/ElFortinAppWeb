import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-provider',
  templateUrl: './dialog-provider.component.html',
  styleUrl: './dialog-provider.component.css'
})
export class DialogProviderComponent {
  providerForm: FormGroup;
  isEditMode: boolean = false;  

  constructor(
    private fb : FormBuilder,
    public dialogRef: MatDialogRef<DialogProviderComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)public data: any
  ) {
      this.isEditMode = !!data?.id;
      
      this.providerForm = this.fb.group({
        id: ['',[Validators.required]],
        name: ['', [Validators.required]],
        contact_info: [''],
        
      });
  
      if (this.isEditMode) {
        this.providerForm.patchValue(data);
      }
    }

    ngOnInit(): void {
      if (!this.isEditMode) {
        this.providerForm.get('id')?.disable();
      }
    }

      onNoClick():void{
      this.dialogRef.close();
      }

      onConfirm(): void {
        if (this.providerForm.invalid) {
          this.showFormErrors();
          return;
        }
    
        const formData = this.prepareFormData();
        this.dialogRef.close(formData);
      }

      private prepareFormData(): any {
        const formValue = this.providerForm.value;                        
        return formValue;
      }
    
      private showFormErrors(): void {
        const errors = [];
        
        if (this.providerForm.get('name')?.hasError('required')) {
          errors.push('El nombre es requerido');
        }
        
        if (this.providerForm.get('contact_info')?.hasError('required')) {
          errors.push('El contacto es requerido');
        }

        if (errors.length > 0) {
          this.snackBar.open(errors.join(', '), 'Cerrar', { duration: 5000 });
        }
      }

    }
