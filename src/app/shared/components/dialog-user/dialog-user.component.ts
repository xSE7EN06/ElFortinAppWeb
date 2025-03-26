import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-user',
  standalone: false,
  templateUrl: './dialog-user.component.html',
  styleUrl: './dialog-user.component.scss'
})
export class DialogUserComponent implements OnInit {
  usuarioForm: FormGroup;
  updatePassword: boolean = false;

  constructor(
    
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogUserComponent>,
    private snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {
    this.usuarioForm = this.fb.group({    
      id: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required,],
      user_type: ['', Validators.required],
      nickname: ['', Validators.required],
      encrypted_password: [{ value: '', disabled: true }],
      confirm_password: [{ value: '', disabled: true }],
    });
  }

  ngOnInit(): void {
    if (this.data?.id) {
      // Si hay un usuario, llenar el formulario con su información, incluyendo el ID
      this.usuarioForm.patchValue({
        id: this.data.id, // Asegurar que el ID se establece
        name: this.data.name,        
        email: this.data.email,
        phone: this.data.phone,
        user_type: this.data.user_type,
        nickname: this.data.nickname
      });
    } else {
      // Si es un nuevo usuario, quitar la validación de 'required' en el ID
      this.usuarioForm.get('id')?.clearValidators();
      this.usuarioForm.get('id')?.updateValueAndValidity();
    }
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (this.usuarioForm.valid) {
      if (this.updatePassword) {
        const password = this.usuarioForm.get('encrypted_password')?.value;
        const confirmPassword = this.usuarioForm.get('confirm_password')?.value;

        if (password !== confirmPassword) {
          console.log("❌ Las contraseñas no coinciden");
          this.snackBar.open('❌ Las contraseñas no coinciden', 'Cerrar', { duration: 3000 });
          return;
        }
      }

      const updatedData = { ...this.data, ...this.usuarioForm.value };
      this.dialogRef.close(updatedData);
    }
  }

  togglePasswordField(): void {
    const passwordControl = this.usuarioForm.get('encrypted_password');
    const passwordConfirmControl = this.usuarioForm.get('confirm_password');

    if (passwordControl?.disabled && passwordConfirmControl?.disable ) {
      passwordControl.enable(); //  Habilita el campo
      passwordConfirmControl.enable();
      this.updatePassword = true
    
    } else {
      passwordControl?.disable(); //  Deshabilita el campo
      passwordConfirmControl?.disable();
      this.updatePassword = false;
    
    }
    
  }
}
